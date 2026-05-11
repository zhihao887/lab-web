<template>
  <!-- Hero Section -->
  <section class="join-hero">
    <div class="join-hero-content">
      <span class="join-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        招募中
      </span>
      <h1>加入我们，做真正有价值的研究</h1>
      <p class="join-hero-desc">
        我们相信科研的极致浪漫是让技术真正落地，去解决那些真正有价值的问题。
      </p>
      <a class="join-cta" :href="`mailto:${siteInfo.email}?subject=申请加入实验室`">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        发送申请邮件
      </a>
    </div>
  </section>

  <!-- Why Join -->
  <section class="section why-join">
    <div class="section-heading center">
      <p class="eyebrow">Why Choose Us</p>
      <h2>为什么选择我们？</h2>
    </div>
    <div class="reasons-list">
      <div class="reason-item">
        <div class="reason-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div class="reason-content">
          <h3>前沿研究</h3>
          <p>从事直接影响国家能源安全、工业自动化的突破性研究，让代码跑在天上、地上、地下。</p>
        </div>
      </div>
      <div class="reason-item">
        <div class="reason-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
          </svg>
        </div>
        <div class="reason-content">
          <h3>专业团队</h3>
          <p>与来自一线企业、工业现场的工程师合作，接触真实的工程数据和场景。</p>
        </div>
      </div>
      <div class="reason-item">
        <div class="reason-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <div class="reason-content">
          <h3>实际影响</h3>
          <p>看到您的工作转化为守护无人机安全飞行、指挥无人车智能巡检、保护国家能源动脉的实际应用。</p>
        </div>
      </div>
      <div class="reason-item">
        <div class="reason-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div class="reason-content">
          <h3>职业发展</h3>
          <p>在控制理论、人工智能、无人系统方面发展宝贵技能，拥有良好的职业发展机会。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Research Assistant -->
  <section class="section research-assistant">
    <div class="section-heading center">
      <p class="eyebrow">Research Assistant</p>
      <h2>长期招收研究助理</h2>
    </div>
    <div class="ra-content">
      <p>
        我们长期欢迎对<strong>控制理论、人工智能、无人系统、工程自动化</strong>感兴趣的本科生、研究生加入实验室，从事相关研究工作。如果你有志于申请 PhD，这是一个非常好的研究起步机会。
      </p>
    </div>
    <div class="ra-section">
      <h3>工作内容</h3>
      <ul class="ra-tasks">
        <li>协助进行研究与开发，包括数据处理、模型训练与评估等工作</li>
        <li>跟进前沿文献，协助推进研究进展</li>
        <li>参与团队科研成果整理与对外输出，目标在顶级会议及期刊发表</li>
        <li>参与工程项目落地，将理论方法应用到实际场景</li>
      </ul>
    </div>
    <div class="ra-cta">
      <p>有意者请发送简历至</p>
      <a class="email-link" :href="`mailto:${siteInfo.email}?subject=申请加入实验室`">
        {{ siteInfo.email }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { siteInfo } from '../data/siteData'
</script>
