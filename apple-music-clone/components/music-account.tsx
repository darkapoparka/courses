"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMusic } from "./music-context";
import { Footer, Glyph } from "./music-primitives";

const sourceProfile = {
  email: "alexsmith@content-mobbin.com",
  name: "SmithAlex",
  address: "75 Ayer Rajah Cres, JTC Launchpad@One-North",
  postcode: "Singapore 139953",
};

/** Account pages in the capture scroll inside an embedded content area. The
 * sidebar and 173px legal/player footer do not scroll or dim with its dialogs. */
function AccountFrame({ children, heading = true }: { children: ReactNode; heading?: boolean }) {
  const m = useMusic();
  const scroll = useRef<HTMLDivElement>(null);
  const chinese = m.library.locale === "zh";
  useEffect(() => {
    const host = scroll.current;
    if (!host) return;
    const frame = requestAnimationFrame(() => {
      const id = m.scene.scroll;
      const section = id ? host.querySelector<HTMLElement>(`#${id}`) : null;
      if (section) {
        const offset = id === "account-access" ? -10 : id === "parental-controls" ? 24 : id === "subscriptions" ? 525 : 24;
        host.scrollTop += section.getBoundingClientRect().top - host.getBoundingClientRect().top - offset;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [m.scene.scroll]);
  return <div className="account-frame"><div className="account-scroll" ref={scroll}><div className="account-inner">
    {heading && <h1>{chinese ? "账户设置" : "Account Settings"}</h1>}{children}
  </div></div><Footer /></div>;
}

export function SettingsView() {
  const m = useMusic();
  const zh = m.library.locale === "zh";
  const external = () => m.notify("This is a local interface preview. No Apple account is connected or changed.");
  return <AccountFrame>
    <section className="account-section account-summary" id="account-summary"><h2>{zh ? "账户摘要" : "Account Summary"}</h2><div>
      <h3>{zh ? "Apple 账户" : "Apple Account"}</h3><p>{sourceProfile.email}</p><button type="button" className="text-accent" onClick={() => m.patch({ overlay: "signin", formStep: 0 })}>{zh ? "编辑" : "Edit"}<Glyph name="external" size={12} /></button>
      <div className="account-columns"><div><h3>{zh ? "付款类型" : "Payment Type"}</h3><p>Visa •••• 2193</p><button type="button" className="text-accent payment-link" onClick={() => m.patch({ overlay: "payment", formStep: 0, filled: false })}>{zh ? "管理付款方式" : <>Manage<br />Payments</>}</button></div><div><h3>{zh ? "账单寄送地址" : "Billing address"}</h3><p>{sourceProfile.name}</p><p>{sourceProfile.address}</p><p>{sourceProfile.postcode}</p></div><div><h3>{zh ? "国家或地区" : <>Country /<br />Region</>}</h3><p>{zh ? "新加坡" : "Singapore"}</p></div></div>
      <h3>{zh ? "Apple 账户余额" : "Apple Account Balance"}</h3><p>S$ 0.00</p><button type="button" className="text-accent redeem-link" onClick={external}>{zh ? "兑换促销代码" : "Redeem Promotional Code"}</button>
    </div></section>
    <section className="account-section account-access" id="account-access"><h2>{zh ? "账户访问" : "Account Access"}</h2><div>
      <h3>{zh ? "网页版 Music、播客和 TV" : "Music, Podcasts and TV on the Web"}</h3><p>{zh ? "当你在网页浏览器中登录 Apple Music 时，也会自动登录网页版 Apple TV 和 Apple 播客。" : "When you sign in to Apple Music on a web browser, you are automatically signed in to Apple TV and Apple Podcasts. This allows you to play music, TV shows and podcasts on the web. You can sign out of all services and all browsers at any time."}</p><button type="button" className="text-accent" onClick={() => { m.patch({ guest: true, namedProfile: false }); m.notify("Signed out of this preview. No external browser sessions were changed."); }}>{zh ? "退出所有浏览器" : "Sign Out of All Browsers"}</button>
      <h3 className="connected-heading">{zh ? "关联账户" : "Connected Accounts"}</h3><p>{zh ? "管理已关联到你账户的应用和服务。" : "Manage the apps and services you have connected to your account."}</p><button type="button" className="text-accent" onClick={() => m.go("connected")}>{zh ? "管理关联账户" : "Manage Connected Accounts"}</button>
    </div></section>
    <section className="account-section account-parental" id="parental-controls"><h2>{zh ? "家长控制" : "Parental Controls"}</h2><div>
      <p>{zh ? "这些内容限制适用于网页版 Apple TV、Apple 播客和 Apple Music，不会限制其他设备上的播放。" : "These content restrictions apply to Apple TV, Apple Podcasts and Apple Music on the web. They do not restrict playback on other devices."}</p>
      {m.library.restrictions && <div className="account-recovery"><div><h3>Passcode</h3><button type="button" className="text-accent" onClick={() => m.patch({ overlay: "passcode", formStep: 0, filled: false })}>Change passcode</button></div><div><h3>Recovery Email Address</h3><p>{sourceProfile.email}</p><button type="button" className="text-accent" onClick={() => m.patch({ overlay: "passcode", formStep: 2, filled: false })}>Edit</button></div></div>}
      <h3 className="restriction-title">{zh ? "内容限制" : "Content Restrictions"}</h3><p>{zh ? "仅允许所选分级及以下的内容。" : "Only content up to and including your selected rating will be allowed."}</p>
      <button type="button" role="switch" aria-label="Content Restrictions" aria-checked={m.library.restrictions} className="restriction-switch" onClick={() => m.library.restrictions ? m.setLibrary(data => ({ ...data, restrictions: false })) : m.patch({ overlay: "passcode", formStep: 0, filled: false })}><span />{m.library.restrictions ? "On" : "Off"}</button>
      <label className="rating-field">{zh ? "音乐和播客" : "Music and Podcasts"}<select aria-label="Music and Podcasts rating" value={m.library.musicRating} onChange={event => m.setLibrary(data => ({ ...data, musicRating: event.target.value === "Explicit" ? "Explicit" : "Clean" }))}><option>Clean</option><option>Explicit</option></select></label>
      <label className="rating-field">{zh ? "电视节目" : "TV shows"}<select aria-label="TV show rating" value={m.library.tvRating} onChange={event => m.setLibrary(data => ({ ...data, tvRating: event.target.value }))}>{["G", "PG", "PG13", "M18"].map(rating => <option key={rating}>{rating}</option>)}</select></label>
      <label className="rating-field">{zh ? "电影" : "Movies"}<select aria-label="Movie rating" value={m.library.movieRating} onChange={event => m.setLibrary(data => ({ ...data, movieRating: event.target.value }))}>{["G", "PG", "PG13", "NC16", "M18", "R21"].map(rating => <option key={rating}>{rating}</option>)}</select></label>
    </div></section>
    <section className="account-section account-subscriptions" id="subscriptions"><h2>{zh ? "订阅" : "Subscriptions"}</h2><div><h3>{zh ? "查看和管理你的订阅。" : "View and manage your subscriptions."}</h3><button type="button" className="text-accent" onClick={() => m.go("subscription")}>{zh ? "管理" : "Manage"}</button></div></section>
  </AccountFrame>;
}

export function ConnectedView() {
  const m = useMusic();
  return <AccountFrame><div className="account-back"><button type="button" className="text-accent" onClick={() => m.go("settings")}>‹ Back</button></div><section className="connected-account-view"><h2>Connected Accounts</h2><p>Manage the apps and services you have connected to your account.</p><div className="connected-empty">No Connected Accounts</div></section></AccountFrame>;
}
export function SubscriptionView() {
  const m = useMusic(); const cancelled = m.library.cancelled || m.scene.cancelled;
  return <AccountFrame><div className="account-back"><button type="button" className="text-accent" onClick={() => m.go("settings")}>‹ Back</button></div><section className={`subscription-details ${cancelled ? "cancelled" : ""}`}>
    <h2><span className="music-badge small"><Glyph name="music" size={29} /></span>Apple Music</h2><h3>Individual</h3>
    {cancelled ? <><p className="text-accent">You have cancelled your subscription.</p><p>Your subscription ended on 13 July.</p><button type="button" className="account-action filled" onClick={() => m.patch({ overlay: "payment", formStep: 0, filled: false })}>Subscribe</button></> : <><strong>You have subscribed through a free offer.</strong><p>Starting 25 July, plan renews for $10.98/month until cancelled.</p></>}
    <hr />{!cancelled && <h3>Manage</h3>}<button type="button" className="account-action" onClick={() => m.patch({ overlay: "payment", formStep: 0, filled: false })}>See All Plans</button>
    {!cancelled && <><button type="button" className="account-action" onClick={() => m.patch({ overlay: "cancel-trial" })}>Cancel Free Trial</button><p>If you cancel, you will immediately lose access to your subscription.</p></>}
    <button type="button" className="text-accent subscription-privacy" onClick={() => m.notify("Local subscription preview only. No billing account or payment provider is connected.")}>About Subscriptions and Privacy</button>
  </section></AccountFrame>;
}
