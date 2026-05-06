<template>
  <div class="hero-visual" aria-hidden="true">
    <div class="signal-orbit signal-orbit-one"></div>
    <div class="signal-orbit signal-orbit-two"></div>

    <div class="visual-panel panel-clinical">
      <div class="panel-head">
        <span class="window-dot red"></span>
        <span class="window-dot yellow"></span>
        <span class="window-dot green"></span>
        <strong>Binding Signal</strong>
      </div>
      <div class="chart-area">
        <svg viewBox="0 0 360 130" role="img">
          <path class="chart-grid" d="M20 24H340M20 56H340M20 88H340M20 120H340" />
          <path class="chart-line line-a" d="M20 104C50 78 70 91 94 66C120 38 148 62 176 52C213 39 225 80 258 58C294 34 316 52 340 30" />
          <path class="chart-line line-b" d="M20 82C52 91 70 61 98 72C130 84 144 44 172 60C206 80 232 52 260 68C296 89 315 74 340 96" />
          <circle cx="258" cy="58" r="7" class="pulse-dot" />
        </svg>
        <div class="risk-chip">Affinity 0.82</div>
      </div>
      <div class="clinical-rows">
        <span style="--w: 78%"></span>
        <span style="--w: 54%"></span>
        <span style="--w: 86%"></span>
      </div>
    </div>

    <div class="visual-panel panel-copilot">
      <div class="panel-head">
        <span class="ai-chip"></span>
        <strong>BioAI Pipeline</strong>
      </div>
      <div class="chat-line ai">筛选候选天然分子集合</div>
      <div class="chat-line doctor">融合靶点结构与序列特征</div>
      <div class="chat-line ai">生成可复现实验验证队列</div>
      <div class="status-strip">
        <span></span>
        <b>review required</b>
      </div>
    </div>

    <div class="visual-panel panel-model">
      <div class="node-map">
        <span class="node n1"></span>
        <span class="node n2"></span>
        <span class="node n3"></span>
        <span class="node n4"></span>
        <i class="edge e1"></i>
        <i class="edge e2"></i>
        <i class="edge e3"></i>
      </div>
      <div>
        <strong>Bio-Med Matrix</strong>
        <small>proteins · molecules · images · tongues</small>
      </div>
    </div>
  </div>
</template>
