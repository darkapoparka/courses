import Link from "next/link";
import { Disclosure } from "@/components/ui/disclosure";
const copy = {
  en: {
    title: "Account Settings",
    summary: "Account Summary",
    account: "Sample account",
    email: "Fictional learner · no verified identity",
    payment: "Payment methods",
    none: "None connected",
    region: "Country / region",
    example: "Sample region only",
    access: "Account Access",
    info: "This is an isolated language-flow study. It does not change a real account or translate the rest of the application.",
    language: "Language",
    choose: "Choose a language",
    apply: "Apply to this study",
    note: "English and Simplified Chinese are implemented for this demonstration only.",
    back: "Back to UI studies",
  },
  zh: {
    title: "账户设置",
    summary: "账户摘要",
    account: "示例账户",
    email: "虚构学习者 · 身份未经验证",
    payment: "付款方式",
    none: "未连接",
    region: "国家或地区",
    example: "仅为示例地区",
    access: "账户访问",
    info: "这是独立的语言切换界面示例。它不会更改真实账户，也不会翻译应用的其他页面。",
    language: "语言",
    choose: "选择语言",
    apply: "应用到此示例",
    note: "此演示仅实现英语和简体中文。",
    back: "返回界面示例",
  },
};
export default async function LanguageStudy({
  searchParams,
}: PageProps<"/preview/language">) {
  const query = await searchParams;
  const locale = query.locale === "zh" ? "zh" : "en";
  const text = copy[locale];
  return (
    <div
      className="settings-page language-study"
      lang={locale === "zh" ? "zh-Hans" : "en"}
    >
      <header>
        <h1>{text.title}</h1>
        <p className="muted">{text.note}</p>
      </header>
      <section className="settings-section">
        <h2>{text.summary}</h2>
        <div>
          <h3>{text.account}</h3>
          <p>learner@example.test</p>
          <p>{text.email}</p>
          <div className="account-columns">
            <div>
              <h3>{text.payment}</h3>
              <p>{text.none}</p>
            </div>
            <div>
              <h3>{text.region}</h3>
              <p>{text.example}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="settings-section">
        <h2>{text.access}</h2>
        <div>
          <p>{text.info}</p>
        </div>
      </section>
      <section className="settings-section">
        <h2>{text.language}</h2>
        <div>
          <Disclosure
            title={text.choose}
            description={text.note}
            trigger={locale === "zh" ? "简体中文" : "English (UK)"}
          >
            <form action="/preview/language">
              <label className="field">
                {text.language}
                <select name="locale" defaultValue={locale}>
                  <option value="en">English (UK)</option>
                  <option value="zh">简体中文</option>
                </select>
              </label>
              <button className="primary-button">{text.apply}</button>
            </form>
          </Disclosure>
        </div>
      </section>
      <Link className="text-link" href="/preview">
        {text.back}
      </Link>
    </div>
  );
}
export const metadata = { title: "Language layout study" };
