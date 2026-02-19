# StormRelay Manual Test Checklist

**File:** `file:///E:/claudecode/影视飓风项目/index.html`

---

## Step 1: Navigate & Clear Data
- [ ] Open `file:///E:/claudecode/影视飓风项目/index.html` in Chrome/Edge
- [ ] Open DevTools (F12) → Console
- [ ] Run: `localStorage.clear(); location.reload();`
- [ ] Wait 2 seconds
- [ ] **Expected:** Page shows project list including "零下25度，我和百万设备谁先挂……"

---

## Step 2: Open Project
- [ ] Click the "零下25度" project card
- [ ] **Expected:** URL becomes `project.html?id=snow-25-demo`
- [ ] **Expected:** Video area visible (video may not play if mp4 missing)
- [ ] **Expected:** 3 view buttons: 剪辑视角 | 运营视角 | 电商视角

---

## Step 3: 电商视角 (Ecommerce View)
- [ ] Click "电商视角" button
- [ ] **Expected:**
  - [ ] Source tags: 自有品牌, 合作方
  - [ ] Checkboxes on each ecommerce card
  - [ ] Edit (✏️) and Delete (🗑️) buttons
  - [ ] Time ranges (e.g. 04:05-04:22)
  - [ ] Translation table (技术语言 → 消费者语言)
  - [ ] "+ 添加电商素材" button

---

## Step 4: Checkbox Test
- [ ] Check one checkbox on an ecommerce card
- [ ] **Expected:** "偏好已记录 → 知识图谱" hint appears for ~4 seconds

---

## Step 5: Shooting Advice Tab
- [ ] Find right-side panel with "拍摄建议" tab
- [ ] Click "拍摄建议"
- [ ] **Expected:** Clickable time stamps (04:05, 08:39, etc.)

---

## Step 6: 剪辑视角 (Editor View)
- [ ] Click "剪辑视角"
- [ ] **Expected:** sellingPoints with source tags (自有品牌, 合作方, 自研技术, 友商)

---

## Step 7: 运营视角
- [ ] Click "运营视角"
- [ ] **Expected:** Read-only view, indicator shows "运营视角 · 查看剪辑师确认的信息"

---

## Step 8: Knowledge Page
- [ ] Navigate to `file:///E:/claudecode/影视飓风项目/knowledge.html`
- [ ] **Expected:**
  - [ ] Title: "AI 规则沉淀"
  - [ ] Rule cards with categories, confidence bars, origin badges
  - [ ] Stats: 已沉淀规则, 累计应用次数, 平均置信度

---

## Step 9: Console Errors
- [ ] Throughout test, watch Console (F12) for red errors
- [ ] Note any errors here: _______________________

---

**Report:** Check each box and note any failures or visual issues.
