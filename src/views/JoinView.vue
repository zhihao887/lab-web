<template>
  <div class="join-page">
    <section class="join-hero" aria-labelledby="join-title">
      <div class="hero-copy">
        <p class="join-eyebrow">Join Our Research Group</p>
        <h1 id="join-title">把真实问题，<span>做成可落地的研究</span></h1>
        <p class="hero-lede">
          我们欢迎对控制理论、无人系统、人工智能与工程项目有长期兴趣的同学加入。这里更看重持续推进问题的能力，也看重把想法做成系统、实验和论文的耐心。
        </p>
        <div class="hero-actions" aria-label="加入我们操作">
          <a class="join-button primary" :href="mailtoHref" @click="sendApplicationEmail">提交申请</a>
          <a class="join-button secondary" href="#join-openings">查看适合方向</a>
        </div>
      </div>

      <aside class="hero-board" aria-label="申请概览">
        <div class="board-topline">
          <span>Application board</span>
          <strong>2026</strong>
        </div>
        <div class="board-title">
          <span class="board-marker"></span>
          <div>
            <p>当前开放</p>
            <h2>本科生、研究生与工程协作者</h2>
          </div>
        </div>
        <div class="board-flow" aria-label="申请流程概览">
          <span>了解问题</span>
          <span>选择身份</span>
          <span>准备材料</span>
          <span>邮件沟通</span>
        </div>
        <dl class="board-meta">
          <div>
            <dt>培养方式</dt>
            <dd>定期组会 + 一对一指导</dd>
          </div>
          <div>
            <dt>核心产出</dt>
            <dd>论文、系统、代码与工程验证</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section class="support-strip" aria-label="团队支持">
      <div v-for="item in supportStats" :key="item.label" class="support-item">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </div>
    </section>

    <section id="join-openings" class="join-section role-section">
      <div class="section-heading">
        <p class="join-eyebrow">Open Roles</p>
        <h2>先选择最接近你的加入方式</h2>
        <p>
          不同阶段需要的节奏不一样。你可以从下面的身份开始了解，我们会按目标和可投入时间匹配合适的问题。
        </p>
      </div>

      <div class="role-layout">
        <div class="role-tabs" role="tablist" aria-label="选择加入身份">
          <button
            v-for="role in roles"
            :id="`${role.id}-tab`"
            :key="role.id"
            class="role-tab"
            :class="{ active: activeRoleId === role.id }"
            type="button"
            role="tab"
            :aria-selected="activeRoleId === role.id"
            :aria-controls="`${role.id}-panel`"
            @click="activeRoleId = role.id"
          >
            <span>{{ role.kicker }}</span>
            <strong>{{ role.title }}</strong>
          </button>
        </div>

        <article
          :id="`${activeRole.id}-panel`"
          class="role-detail"
          role="tabpanel"
          :aria-labelledby="`${activeRole.id}-tab`"
        >
          <div>
            <p class="role-kicker">{{ activeRole.kicker }}</p>
            <h3>{{ activeRole.title }}</h3>
            <p>{{ activeRole.summary }}</p>
          </div>
          <div class="role-columns">
            <div>
              <h4>适合你，如果你希望</h4>
              <ul>
                <li v-for="item in activeRole.goals" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div>
              <h4>我们会提供</h4>
              <ul>
                <li v-for="item in activeRole.support" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="join-section value-section">
      <div class="section-heading compact">
        <p class="join-eyebrow">Why Join</p>
        <h2>在这里，研究不是孤立地刷指标</h2>
      </div>
      <div class="value-grid">
        <article v-for="(item, index) in values" :key="item.title" class="value-card">
          <span class="card-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section class="join-section process-section">
      <div class="section-heading">
        <p class="join-eyebrow">Process</p>
        <h2>申请流程保持简单透明</h2>
        <p>我们更希望在一两次沟通里确认兴趣、能力和节奏是否匹配，而不是让流程本身消耗过多精力。</p>
      </div>
      <ol class="process-list">
        <li v-for="step in processSteps" :key="step.title">
          <span>{{ step.step }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="join-section preparation-section">
      <div class="section-heading">
        <p class="join-eyebrow">Checklist</p>
        <h2>发送邮件前，先把材料整理清楚</h2>
        <p>勾选清单会即时显示准备进度，方便你判断申请材料是否已经足够完整。</p>
      </div>

      <div class="preparation-layout">
        <div class="checklist-panel">
          <div class="progress-head">
            <strong>申请包完整度</strong>
            <span>{{ checkedMaterials.length }} / {{ materials.length }}</span>
          </div>
          <div class="progress-track" aria-hidden="true">
            <span :style="{ width: `${completion}%` }"></span>
          </div>

          <label v-for="item in materials" :key="item.id" class="material-row">
            <input v-model="checkedMaterials" type="checkbox" :value="item.id" />
            <span class="material-copy">
              <strong>{{ item.label }}</strong>
              <small>{{ item.hint }}</small>
            </span>
          </label>
        </div>

        <aside class="mail-panel">
          <p class="join-eyebrow">Mail Template</p>
          <h3>建议邮件包含这些信息</h3>
          <ul>
            <li>姓名、学校/年级、专业方向</li>
            <li>最感兴趣的问题或项目</li>
            <li>每周可投入时间与近期目标</li>
            <li>可以证明能力的项目、代码或作品链接</li>
          </ul>
          <a class="join-button primary wide" :href="mailtoHref" @click="sendApplicationEmail">按模板发邮件</a>
        </aside>
      </div>
    </section>

    <section class="join-section faq-section">
      <div class="section-heading compact">
        <p class="join-eyebrow">FAQ</p>
        <h2>常见问题</h2>
      </div>
      <div class="faq-list">
        <article v-for="item in faqs" :key="item.id" class="faq-item">
          <button
            type="button"
            :aria-expanded="openFaqId === item.id"
            :aria-controls="`${item.id}-answer`"
            @click="toggleFaq(item.id)"
          >
            <span>{{ item.question }}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <p v-show="openFaqId === item.id" :id="`${item.id}-answer`">{{ item.answer }}</p>
        </article>
      </div>
    </section>

    <section class="final-cta" aria-labelledby="final-cta-title">
      <div>
        <p class="join-eyebrow">Ready</p>
        <h2 id="final-cta-title">期待和你一起把问题往前推</h2>
        <p>如果你已经有明确兴趣，直接发送申请材料即可；如果还不确定方向，也可以先说明自己的背景与想探索的问题。</p>
      </div>
      <a class="join-button primary" :href="mailtoHref" @click="sendApplicationEmail">提交申请</a>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { siteInfo } from '../services/contentStore'

const supportStats = [
  { value: '长期', label: '围绕真实问题持续推进' },
  { value: '开放', label: '支持跨学科协作与试错' },
  { value: '闭环', label: '从理论、代码到工程验证' },
  { value: '成长', label: '按阶段匹配研究任务' },
]

const roles = [
  {
    id: 'undergraduate',
    kicker: '提前进组',
    title: '本科生科研训练',
    summary: '适合大三、大四或已经具备基础编程能力的同学，从复现、实验和小型工具开始进入长期问题。',
    goals: ['把课堂知识放到真实研究任务中检验', '积累可展示的代码、报告和项目经历', '为保研、升学或毕业设计建立方向'],
    support: ['学长学姐定向带入门', '清晰的阶段任务和复盘反馈', '参与组会、阅读会与工具链分享'],
  },
  {
    id: 'graduate',
    kicker: '论文导向',
    title: '研究生与长期课题',
    summary: '适合希望围绕一个问题长期推进的同学，重点关注方法设计、实验验证、论文写作与可复现实验。',
    goals: ['围绕控制、无人系统或智能算法形成主线', '从问题定义推进到实验、论文和系统', '建立自己的科研判断与写作节奏'],
    support: ['一对一问题讨论与论文反馈', '实验设计、消融分析和复现规范', '跨方向协作与工程场景支持'],
  },
  {
    id: 'engineering',
    kicker: '工程落地',
    title: '工程协作者',
    summary: '适合喜欢把研究做成系统的人，关注可运行原型、自动化流程、数据工具和软硬件协同。',
    goals: ['把算法变成稳定可用的系统或演示', '参与真实工程项目和工具链建设', '在项目中提升代码质量与交付能力'],
    support: ['明确的接口、需求和验收标准', '真实数据、硬件或业务场景', '与研究同学共同打磨可复用成果'],
  },
]

const activeRoleId = ref(roles[0].id)
const activeRole = computed(() => roles.find((role) => role.id === activeRoleId.value) ?? roles[0])

const values = [
  {
    title: '问题边界清晰',
    description: '每个课题都尽量从具体痛点出发，明确目标、约束、评测方式和阶段成果。',
  },
  {
    title: '科研与工程并重',
    description: '既关注理论和论文，也重视可复现实验、可维护代码和真实系统中的表现。',
  },
  {
    title: '反馈频率稳定',
    description: '通过组会、文档和一对一讨论减少信息差，让问题推进过程更有节奏。',
  },
  {
    title: '成长路径可见',
    description: '从文献复现、数据整理、基线搭建到独立承担模块，逐步提高任务复杂度。',
  },
]

const processSteps = [
  { step: '01', title: '了解方向', description: '浏览研究问题、项目和成果，找到你真正想投入的方向。' },
  { step: '02', title: '准备材料', description: '整理简历、成绩、项目、代码或作品，突出你能持续推进问题的证据。' },
  { step: '03', title: '邮件沟通', description: '说明背景、兴趣、可投入时间和希望加入的方式。' },
  { step: '04', title: '匹配任务', description: '根据能力和目标确定试做任务，再决定长期参与方式。' },
]

const materials = [
  { id: 'resume', label: '个人简历', hint: '一页或两页即可，突出项目、课程和能力证据。' },
  { id: 'transcript', label: '成绩或课程背景', hint: '无需追求完美，重点说明与方向相关的基础。' },
  { id: 'portfolio', label: '代码、项目或作品链接', hint: 'GitHub、报告、演示视频、论文复现记录都可以。' },
  { id: 'interest', label: '兴趣方向说明', hint: '写清楚你为什么对这个问题感兴趣，以及近期目标。' },
]

const checkedMaterials = ref(['resume'])
const completion = computed(() => Math.round((checkedMaterials.value.length / materials.length) * 100))

const faqs = [
  {
    id: 'faq-time',
    question: '每周需要投入多少时间？',
    answer: '没有固定模板，但需要稳定投入。我们会按你的身份、课程压力和目标拆分阶段任务，避免只靠临时突击。',
  },
  {
    id: 'faq-background',
    question: '没有完整科研经历可以申请吗？',
    answer: '可以。我们更看重自驱力、基础能力和持续反馈。可以先从复现、数据整理或工具开发开始。',
  },
  {
    id: 'faq-topic',
    question: '还不确定具体方向怎么办？',
    answer: '邮件里说明你最感兴趣的技术关键词、做过的项目和想解决的问题，我们会协助匹配合适入口。',
  },
]

const openFaqId = ref(faqs[0].id)
const toggleFaq = (id) => {
  openFaqId.value = openFaqId.value === id ? '' : id
}

const mailSubject = '申请加入问题研究社'
const mailBody =
  '老师您好，\n\n我希望申请加入问题研究社。我的基本信息如下：\n姓名：\n学校/年级：\n专业方向：\n感兴趣的问题或项目：\n每周可投入时间：\n项目/代码/作品链接：\n\n谢谢！'

const mailtoHref = computed(() => `mailto:${siteInfo.email}`)
const mailtoTemplateHref = computed(() => {
  const subject = encodeURIComponent(mailSubject)
  const body = encodeURIComponent(mailBody)

  return `mailto:${siteInfo.email}?subject=${subject}&body=${body}`
})

const isMobileMailEnvironment = () => {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(max-width: 720px), (hover: none), (pointer: coarse)').matches
}

const copyMailTemplate = async () => {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return

  try {
    await navigator.clipboard.writeText(`收件人：${siteInfo.email}\n主题：${mailSubject}\n\n${mailBody}`)
  } catch {
    // Some in-app browsers block clipboard access; the clean mailto link still opens normally.
  }
}

const sendApplicationEmail = (event) => {
  if (isMobileMailEnvironment()) {
    void copyMailTemplate()
    return
  }

  event.preventDefault()
  window.location.href = mailtoTemplateHref.value
}
</script>

<style scoped>
.join-page {
  --join-ink: #172033;
  --join-muted: #5f6f84;
  --join-blue: #2f5f98;
  --join-blue-soft: rgba(79, 130, 194, 0.12);
  --join-teal: #1a9691;
  --join-amber: #bc7a12;
  --join-rose: #c95157;
  --join-line: rgba(177, 204, 225, 0.74);
  --join-panel: rgba(255, 255, 255, 0.86);
  --join-shadow: 0 18px 48px rgba(23, 32, 51, 0.1);
  color: var(--join-ink);
  padding: 116px 24px 78px;
}

.join-page :where(h1, h2, h3, h4, p) {
  margin: 0;
  text-wrap: pretty;
}

.join-hero,
.support-strip,
.join-section,
.final-cta {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.join-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(360px, 0.72fr);
  gap: 34px;
  align-items: center;
  min-height: 560px;
  background: linear-gradient(135deg, rgba(232, 247, 254, 0.82), rgba(246, 252, 255, 0.9));
  padding: 54px 0 42px;
  text-align: left;
}

.hero-copy {
  display: grid;
  gap: 24px;
  min-width: 0;
}

.join-eyebrow {
  color: var(--join-blue);
  font-size: 0.82rem;
  font-weight: 780;
  letter-spacing: 0;
  text-transform: uppercase;
}

.join-hero h1 {
  max-width: 780px;
  font-size: clamp(2.55rem, 5.6vw, 4.9rem);
  line-height: 1.02;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.join-hero h1 span {
  display: block;
}

.hero-lede {
  max-width: 680px;
  color: #40546d;
  font-size: 1.12rem;
  line-height: 1.85;
  overflow-wrap: anywhere;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
}

.join-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 760;
  line-height: 1.1;
  padding: 13px 18px;
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.join-button:hover {
  transform: translateY(-1px);
}

.join-button:focus-visible,
.role-tab:focus-visible,
.faq-item button:focus-visible,
.material-row:has(input:focus-visible) {
  outline: 3px solid rgba(31, 183, 177, 0.34);
  outline-offset: 3px;
}

.join-button.primary {
  color: #fff;
  background: linear-gradient(135deg, var(--join-blue), var(--join-teal));
  box-shadow: 0 16px 34px rgba(47, 95, 152, 0.22);
}

.join-button.primary:hover {
  box-shadow: 0 20px 44px rgba(47, 95, 152, 0.28);
}

.join-button.secondary {
  color: #284159;
  background: rgba(255, 255, 255, 0.72);
  border-color: var(--join-line);
}

.join-button.secondary:hover {
  background: #fff;
  border-color: rgba(79, 130, 194, 0.5);
  box-shadow: 0 12px 26px rgba(23, 32, 51, 0.09);
}

.join-button.wide {
  width: 100%;
  margin-top: 22px;
}

.hero-board {
  display: grid;
  gap: 24px;
  min-width: 0;
  border: 1px solid var(--join-line);
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(246, 251, 254, 0.88)),
    linear-gradient(135deg, rgba(79, 130, 194, 0.08), rgba(31, 183, 177, 0.08));
  box-shadow: var(--join-shadow);
  overflow: hidden;
  padding: 24px;
}

.board-topline,
.board-title,
.board-meta div,
.progress-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.board-topline {
  min-height: 40px;
  border-bottom: 1px solid rgba(220, 232, 242, 0.88);
  color: var(--join-muted);
  font-size: 0.86rem;
  font-weight: 700;
  padding-bottom: 14px;
}

.board-topline strong {
  color: var(--join-blue);
}

.board-title {
  align-items: flex-start;
  justify-content: start;
}

.board-title > div {
  min-width: 0;
}

.board-marker {
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  border: 1px solid rgba(31, 183, 177, 0.35);
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(79, 130, 194, 0.18) 1px, transparent 1px),
    linear-gradient(180deg, rgba(31, 183, 177, 0.2) 1px, transparent 1px),
    #f8fcff;
  background-size: 11px 11px;
}

.board-title p {
  color: var(--join-teal);
  font-size: 0.86rem;
  font-weight: 760;
}

.board-title h2 {
  margin-top: 6px;
  font-size: 1.45rem;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.board-flow {
  display: grid;
  gap: 10px;
  position: relative;
}

.board-flow::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: rgba(79, 130, 194, 0.18);
}

.board-flow span {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #33465c;
  font-weight: 720;
}

.board-flow span::before {
  content: "";
  width: 26px;
  height: 26px;
  flex: 0 0 auto;
  border: 6px solid #fff;
  border-radius: 999px;
  background: var(--join-teal);
  box-shadow: 0 0 0 1px rgba(31, 183, 177, 0.32);
}

.board-meta {
  display: grid;
  gap: 1px;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(220, 232, 242, 0.86);
  border-radius: 8px;
  background: rgba(220, 232, 242, 0.86);
}

.board-meta div {
  align-items: start;
  background: rgba(255, 255, 255, 0.72);
  padding: 14px;
}

.board-meta dt {
  color: var(--join-muted);
  font-size: 0.78rem;
  font-weight: 760;
}

.board-meta dd {
  margin: 0;
  color: var(--join-ink);
  font-weight: 760;
  text-align: right;
}

.support-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--join-line);
  border-radius: 8px;
  background: var(--join-line);
  box-shadow: 0 12px 30px rgba(23, 32, 51, 0.07);
}

.support-item {
  min-height: 118px;
  display: grid;
  align-content: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.82);
  padding: 20px;
}

.support-item strong {
  color: var(--join-blue);
  font-size: 1.8rem;
  line-height: 1;
}

.support-item span {
  color: var(--join-muted);
  font-weight: 690;
  line-height: 1.55;
}

.join-section {
  padding: 88px 0 0;
}

.section-heading {
  display: grid;
  gap: 12px;
  max-width: 780px;
  margin-bottom: 28px;
}

.section-heading.compact {
  margin-bottom: 24px;
}

.section-heading h2,
.final-cta h2 {
  font-size: clamp(1.9rem, 3vw, 2.55rem);
  line-height: 1.16;
}

.section-heading p:last-child,
.final-cta p:last-child {
  color: var(--join-muted);
  font-size: 1rem;
  line-height: 1.78;
}

.role-layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 18px;
  align-items: stretch;
}

.role-tabs {
  display: grid;
  gap: 10px;
}

.role-tab {
  display: grid;
  gap: 8px;
  min-height: 104px;
  width: 100%;
  border: 1px solid var(--join-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.74);
  color: var(--join-ink);
  cursor: pointer;
  padding: 18px;
  text-align: left;
  transition: background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.role-tab:hover {
  transform: translateY(-1px);
  border-color: rgba(79, 130, 194, 0.48);
  background: #fff;
}

.role-tab.active {
  background: #fff;
  border-color: rgba(31, 183, 177, 0.58);
  box-shadow: 0 14px 34px rgba(23, 32, 51, 0.08);
}

.role-tab span,
.role-kicker {
  color: var(--join-teal);
  font-size: 0.82rem;
  font-weight: 760;
}

.role-tab strong {
  font-size: 1.08rem;
}

.role-detail {
  display: grid;
  gap: 28px;
  min-height: 330px;
  min-width: 0;
  border: 1px solid var(--join-line);
  border-radius: 8px;
  background: var(--join-panel);
  box-shadow: 0 16px 38px rgba(23, 32, 51, 0.07);
  padding: 30px;
}

.role-detail h3 {
  margin-top: 8px;
  font-size: 2rem;
  line-height: 1.22;
}

.role-detail p {
  max-width: 800px;
  margin-top: 12px;
  color: var(--join-muted);
  line-height: 1.78;
}

.role-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.role-columns h4 {
  margin-bottom: 12px;
  color: #2e455f;
  font-size: 1rem;
}

.role-columns ul,
.mail-panel ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.role-columns li,
.mail-panel li {
  position: relative;
  color: #40546d;
  line-height: 1.65;
  padding-left: 20px;
}

.role-columns li::before,
.mail-panel li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.68em;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--join-teal);
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.value-card {
  min-height: 248px;
  display: grid;
  align-content: start;
  gap: 14px;
  border: 1px solid var(--join-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 12px 30px rgba(23, 32, 51, 0.06);
  padding: 22px;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.value-card:hover {
  transform: translateY(-2px);
  border-color: rgba(31, 183, 177, 0.52);
  box-shadow: 0 18px 40px rgba(23, 32, 51, 0.1);
}

.card-index {
  color: var(--join-amber);
  font-size: 0.86rem;
  font-weight: 820;
}

.value-card h3 {
  font-size: 1.2rem;
  line-height: 1.35;
}

.value-card p {
  color: var(--join-muted);
  line-height: 1.72;
}

.process-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--join-line);
  border-radius: 8px;
  background: var(--join-line);
  padding: 0;
  list-style: none;
}

.process-list li {
  min-height: 236px;
  display: grid;
  align-content: start;
  gap: 34px;
  background: rgba(255, 255, 255, 0.82);
  padding: 24px;
}

.process-list li > span {
  color: var(--join-blue);
  font-size: 1.9rem;
  font-weight: 300;
  line-height: 1;
}

.process-list h3 {
  margin-bottom: 10px;
  font-size: 1.16rem;
}

.process-list p {
  color: var(--join-muted);
  line-height: 1.68;
}

.preparation-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(330px, 0.62fr);
  gap: 18px;
  align-items: start;
}

.checklist-panel,
.mail-panel {
  border: 1px solid var(--join-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 12px 30px rgba(23, 32, 51, 0.06);
  padding: 24px;
}

.progress-head {
  color: var(--join-ink);
  margin-bottom: 12px;
}

.progress-head span {
  color: var(--join-blue);
  font-weight: 760;
}

.progress-track {
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(79, 130, 194, 0.14);
  margin-bottom: 18px;
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--join-blue), var(--join-teal));
  transition: width 220ms ease;
}

.material-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border: 1px solid rgba(220, 232, 242, 0.9);
  border-radius: 8px;
  cursor: pointer;
  padding: 16px;
  transition: background-color 180ms ease, border-color 180ms ease;
}

.material-row + .material-row {
  margin-top: 10px;
}

.material-row:hover {
  border-color: rgba(79, 130, 194, 0.5);
  background: rgba(240, 249, 255, 0.66);
}

.material-row input {
  width: 19px;
  height: 19px;
  flex: 0 0 auto;
  accent-color: var(--join-teal);
  margin-top: 2px;
}

.material-copy {
  display: grid;
  gap: 5px;
}

.material-copy small {
  color: var(--join-muted);
  line-height: 1.58;
}

.mail-panel {
  position: sticky;
  top: 96px;
}

.mail-panel h3 {
  margin: 10px 0 18px;
  font-size: 1.42rem;
  line-height: 1.3;
}

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-item {
  border: 1px solid var(--join-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.84);
  overflow: hidden;
}

.faq-item button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  min-height: 64px;
  border: 0;
  background: transparent;
  color: var(--join-ink);
  cursor: pointer;
  font-weight: 760;
  padding: 18px 20px;
  text-align: left;
}

.faq-item svg {
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
  transition: transform 180ms ease;
}

.faq-item button[aria-expanded="true"] svg {
  transform: rotate(180deg);
}

.faq-item p {
  color: var(--join-muted);
  line-height: 1.75;
  padding: 0 20px 20px;
}

.final-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  margin-top: 92px;
  border: 1px solid rgba(31, 183, 177, 0.36);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(79, 130, 194, 0.1), rgba(31, 183, 177, 0.12)),
    rgba(255, 255, 255, 0.86);
  box-shadow: 0 18px 46px rgba(23, 32, 51, 0.09);
  padding: 32px;
}

.final-cta div {
  display: grid;
  gap: 12px;
  max-width: 780px;
}

@media (max-width: 1080px) {
  .join-hero,
  .role-layout,
  .preparation-layout {
    grid-template-columns: 1fr;
  }

  .hero-board,
  .mail-panel {
    position: static;
  }

  .support-strip,
  .value-grid,
  .process-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .role-tabs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .join-page {
    overflow-x: hidden;
    padding: 94px 18px 56px;
  }

  .join-hero,
  .support-strip,
  .join-section,
  .final-cta {
    max-width: calc(100vw - 36px);
  }

  .join-hero {
    min-height: auto;
    padding: 36px 0 24px;
  }

  .hero-actions,
  .final-cta {
    display: grid;
  }

  .join-button {
    width: 100%;
  }

  .support-strip,
  .value-grid,
  .process-list,
  .role-tabs,
  .role-columns {
    grid-template-columns: 1fr;
  }

  .support-item,
  .process-list li {
    min-height: auto;
  }

  .role-detail,
  .checklist-panel,
  .mail-panel,
  .final-cta,
  .hero-board {
    padding: 20px;
  }

  .role-detail h3 {
    font-size: 1.6rem;
  }

  .join-hero h1 {
    font-size: clamp(2.05rem, 10vw, 2.55rem);
    line-height: 1.06;
  }

  .board-title {
    display: grid;
    grid-template-columns: 1fr;
  }

  .board-title h2 {
    font-size: 1.24rem;
    word-break: break-all;
  }

  .hero-lede {
    font-size: 1rem;
    word-break: break-all;
  }

  .board-meta div {
    display: grid;
  }

  .board-meta dd {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .join-page *,
  .join-page *::before,
  .join-page *::after {
    transition-duration: 1ms !important;
    animation-duration: 1ms !important;
  }
}
</style>
