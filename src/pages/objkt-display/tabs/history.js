import React from 'react'
import { Container, Padding } from '@components/layout'
import { Primary } from '@components/button'
import { walletPreview } from '@utils/string'
import { getTimeAgo } from '@utils/time'
import styles from '../styles.module.scss'

import { IconCache } from '@utils/with-icon'
import TradeIcon from '@icons/trade'
import MintedIcon from '@icons/minted'
import SwapIcon from '@icons/swap'

export const History = (token_info) => {
  let trades = token_info.trades.map((e) => ({ ...e, trade: true }))
  let swaps = token_info.swaps.map((e) => ({ ...e, trade: false }))

  let history = [...trades, ...swaps]
    .sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
    .reverse()

  return (
    <div>
      <IconCache.Provider value={{}}>
        <Container>
          <Padding>
            <div className={styles.history__container}>
              <div className={styles.history__labels}>
                <div
                  className={styles.history__event}
                  style={{ width: 'calc(7% + 35px)' }}
                >
                  Event
                </div>
                <div className={styles.history__from}>From</div>
                <div className={styles.history__to}>To</div>
                <div className={styles.history__ed}>Ed.</div>
                <div className={styles.history__price}>Price</div>
                <div className={styles.history__date}>Time</div>
              </div>
              {history.map((e) => {
                if (e.trade) {
                  return (
                    <div className={`${styles.history}`} key={`t-${e.id}`}>
                      <div className={styles.history__event__container}>
                        <TradeIcon size={16} />
                        <a
                          href={`https://tzkt.io/${e.ophash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Trade
                        </a>
                      </div>

                      <div className={styles.history__from}>
                        <div
                          className={`${styles.history__mobile} ${styles.history__secondary}`}
                        >
                          From
                        </div>
                        {e.seller.name ? (
                          <span>
                            <a
                              href={`/tz/${encodeURI(e.seller.address)}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Primary>{encodeURI(e.seller.name)}</Primary>
                            </a>
                          </span>
                        ) : (
                          <span>
                            <a href={`/tz/${e.seller.address}`}>
                              <Primary>
                                {walletPreview(e.seller.address)}
                              </Primary>
                            </a>
                          </span>
                        )}
                      </div>

                      <div className={styles.history__to}>
                        <div
                          className={`${styles.history__mobile} ${styles.history__secondary}`}
                        >
                          To
                        </div>
                        {e.buyer.name ? (
                          <span>
                            <a
                              href={`/${encodeURI(e.buyer.name)}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Primary>{encodeURI(e.buyer.name)}</Primary>
                            </a>
                          </span>
                        ) : (
                          <span>
                            <a href={`/tz/${e.buyer.address}`}>
                              <Primary>
                                {walletPreview(e.buyer.address)}
                              </Primary>
                            </a>
                          </span>
                        )}
                      </div>

                      <div
                        className={`${styles.history__ed} ${styles.history__desktop}`}
                      >
                        {e.amount}
                      </div>

                      <div
                        className={`${styles.history__price} ${styles.history__desktop}`}
                      >
                        {parseFloat(e.swap.price / 1e6)} tez
                      </div>

                      <div
                        className={`${styles.history__date} ${styles.history__desktop}`}
                        title={e.timestamp}
                      >
                        {getTimeAgo(e.timestamp)}
                      </div>

                      <div className={styles.history__inner__mobile}>
                        <div
                          className={styles.history__date}
                          title={e.timestamp}
                        >
                          {getTimeAgo(e.timestamp)}
                        </div>

                        <div className={styles.history__ed}>ed. {e.amount}</div>

                        <div className={styles.history__price}>
                          {parseFloat(e.swap.price / 1e6)} tez
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className={`${styles.history}`} key={`s-${e.opid}`}>
                      <div className={styles.history__event__container}>
                        <SwapIcon size={16} viewBox={19} />
                        <a
                          href={`https://tzkt.io/${e.ophash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Swap
                        </a>
                      </div>

                      <div className={styles.history__from}>
                        <div
                          className={`${styles.history__mobile} ${styles.history__secondary}`}
                        >
                          from
                        </div>
                        {e.creator.name ? (
                          <span>
                            <a
                              href={`/tz/${encodeURI(e.creator.address)}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Primary>{encodeURI(e.creator.name)}</Primary>
                            </a>
                          </span>
                        ) : (
                          <span>
                            <a href={`/tz/${e.creator.address}`}>
                              <Primary>
                                {walletPreview(e.creator.address)}
                              </Primary>
                            </a>
                          </span>
                        )}
                      </div>

                      <div className={styles.history__to} />
                      <div className={styles.history__ed}>{e.amount}</div>

                      <div className={styles.history__price}>
                        {parseFloat(e.price / 1e6)} tez
                      </div>

                      <div className={styles.history__date} title={e.timestamp}>
                        {getTimeAgo(e.timestamp)}
                      </div>

                      <div className={styles.history__inner__mobile}>
                        <div
                          className={styles.history__date}
                          title={e.timestamp}
                        >
                          {getTimeAgo(e.timestamp)}
                        </div>

                        <div className={styles.history__ed}>ed. {e.amount}</div>

                        <div className={styles.history__price}>
                          {parseFloat(e.price / 1e6)} tez
                        </div>
                      </div>
                    </div>
                  )
                }
              })}

              <div className={styles.history} key="mint-op">
                <div className={styles.history__event__container}>
                  <MintedIcon size={16} />
                  <div className={styles.history__mint__op}>Minted</div>
                </div>

                <div className={styles.history__from}>
                  {token_info.creator.name ? (
                    <span>
                      <a
                        href={`/tz/${encodeURI(token_info.creator.address)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Primary>{encodeURI(token_info.creator.name)}</Primary>
                      </a>
                    </span>
                  ) : (
                    <span>
                      <a href={`/tz/${token_info.creator.address}`}>
                        <Primary>
                          {walletPreview(token_info.creator.address)}
                        </Primary>
                      </a>
                    </span>
                  )}
                </div>

                <div className={styles.history__to} />

                <div className={styles.history__ed}>{token_info.supply}</div>

                <div className={styles.history__price} />

                <div
                  className={styles.history__date}
                  title={token_info.timestamp}
                >
                  {getTimeAgo(token_info.timestamp)}
                </div>

                <div className={styles.history__inner__mobile}>
                  <div
                    className={styles.history__date}
                    title={token_info.timestamp}
                  >
                    {getTimeAgo(token_info.timestamp)}
                  </div>

                  <div className={styles.history__ed}>
                    ed. {token_info.supply}
                  </div>

                  <div className={styles.history__price} />
                </div>
              </div>

              <div className={styles.history__royalties}>
                {token_info.royalties / 10}% Royalties
              </div>
            </div>
          </Padding>
        </Container>
      </IconCache.Provider>
    </div>
  )
}
