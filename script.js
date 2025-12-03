const projects = [
  { name: 'Triển khai eKYC DN', owner: 'Pham Van An', progress: 78, status: 'green', risk: 'Thấp', timeline: 'Q2 → Q3/2024' },
  { name: 'Nâng cấp Portal SME', owner: 'Le Thu Ha', progress: 52, status: 'amber', risk: 'Lệch 1 tuần', timeline: 'Q2/2024' },
  { name: 'Tích hợp ERP SAP', owner: 'Tran Bao Long', progress: 33, status: 'amber', risk: 'Chờ phê duyệt ngân sách', timeline: 'Q2 → Q4/2024' },
  { name: 'Cash pooling quốc tế', owner: 'Pham Van An', progress: 12, status: 'red', risk: 'Chưa có vendor', timeline: 'Q3/2024' },
  { name: 'Phát hành thẻ doanh nghiệp', owner: 'Le Thu Ha', progress: 89, status: 'green', risk: 'Ổn định', timeline: 'Q1 → Q2/2024' },
  { name: 'Workflow nội bộ', owner: 'Tran Bao Long', progress: 64, status: 'green', risk: 'Tăng test case', timeline: 'Q2 → Q3/2024' }
];

const tasks = [
  { title: 'Thiết kế giao diện đăng ký DN', assignee: 'Lan', squad: 'KHDN', status: 'doing', due: '15/06', tags: ['UI/UX', 'Sprint 12'] },
  { title: 'Chuẩn hóa API thu hộ', assignee: 'Huy', squad: 'SME', status: 'todo', due: '12/06', tags: ['API', 'Partner'] },
  { title: 'Chuẩn bị UAT eKYC', assignee: 'Thảo', squad: 'KHDN', status: 'review', due: '10/06', tags: ['UAT', 'Compliance'] },
  { title: 'Ký hợp đồng vendor thẻ', assignee: 'Long', squad: 'Vận hành', status: 'doing', due: '22/06', tags: ['Vendor', 'Pháp lý'] },
  { title: 'Thiết lập dashboard BI', assignee: 'An', squad: 'Vận hành', status: 'todo', due: '25/06', tags: ['Data', 'BI'] },
  { title: 'Kiểm thử bảo mật', assignee: 'Hà', squad: 'SME', status: 'review', due: '18/06', tags: ['Security'] },
  { title: 'Đào tạo RM SME', assignee: 'Nhi', squad: 'SME', status: 'done', due: 'Hoàn tất', tags: ['Training'] }
];

const teamMembers = [
  { name: 'Phạm Văn An', role: 'Product Owner', load: '82%', squad: 'KHDN', focus: 'Kênh eKYC, Cash pooling' },
  { name: 'Lê Thu Hà', role: 'Delivery Manager', load: '76%', squad: 'SME', focus: 'Portal SME, Thẻ DN' },
  { name: 'Trần Bảo Long', role: 'Tech Lead', load: '68%', squad: 'Vận hành', focus: 'Core banking, Workflow' },
  { name: 'Đỗ Minh Huy', role: 'Business Analyst', load: '55%', squad: 'SME', focus: 'Thu hộ, đối soát' },
  { name: 'Nguyễn Bảo Lan', role: 'UI/UX', load: '47%', squad: 'KHDN', focus: 'Onboarding doanh nghiệp' },
  { name: 'Đặng Thảo', role: 'QA Lead', load: '63%', squad: 'Vận hành', focus: 'UAT & Security' }
];

const statusLabels = {
  green: 'On-track',
  amber: 'Theo dõi',
  red: 'Nguy cơ',
  todo: 'To-do',
  doing: 'In progress',
  review: 'Review',
  done: 'Done'
};

const statusColor = {
  green: 'green',
  amber: 'amber',
  red: 'red',
  todo: 'amber',
  doing: 'green',
  review: 'amber',
  done: 'green'
};

function renderProjects() {
  const tbody = document.querySelector('#project-table tbody');
  tbody.innerHTML = '';
  const statusFilter = document.getElementById('project-filter-status').value;
  const ownerFilter = document.getElementById('project-filter-owner').value;

  projects
    .filter(p => statusFilter === 'all' || p.status === statusFilter)
    .filter(p => ownerFilter === 'all' || p.owner === ownerFilter)
    .forEach(project => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${project.name}</td>
        <td>${project.owner}</td>
        <td>
          <div class="progress"><span style="width:${project.progress}%; background: var(--${statusColor[project.status]})"></span></div>
          <small>${project.progress}% - ${statusLabels[project.status]}</small>
        </td>
        <td>${project.timeline}</td>
        <td><span class="pill ${statusColor[project.status]}">${project.risk}</span></td>
      `;
      tbody.appendChild(row);
    });
}

function renderTasks() {
  const board = document.getElementById('task-board');
  board.innerHTML = '';
  const statusFilter = document.getElementById('task-filter-status').value;
  const squadFilter = document.getElementById('task-filter-squad').value;
  const columns = ['todo', 'doing', 'review', 'done'];

  columns.forEach(col => {
    const column = document.createElement('div');
    column.className = 'column';
    const tasksInColumn = tasks.filter(t => t.status === col)
      .filter(t => statusFilter === 'all' || t.status === statusFilter)
      .filter(t => squadFilter === 'all' || t.squad === squadFilter);

    column.innerHTML = `<h3>${statusLabels[col]} <span class="chip">${tasksInColumn.length}</span></h3>`;

    tasksInColumn.forEach(task => {
      const card = document.createElement('div');
      card.className = 'ticket';
      card.innerHTML = `
        <strong>${task.title}</strong><br />
        <small>Owner: ${task.assignee} • Squad: ${task.squad} • Due: ${task.due}</small>
        <div style="margin-top: 6px; display: flex; gap: 6px; flex-wrap: wrap;">
          ${task.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
        </div>
      `;
      column.appendChild(card);
    });

    board.appendChild(column);
  });
}

function renderTeam() {
  const grid = document.getElementById('team-grid');
  grid.innerHTML = '';
  teamMembers.forEach(member => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <p class="chip">${member.squad}</p>
      <h4>${member.name}</h4>
      <p class="muted">${member.role}</p>
      <p>Tải công việc: <strong>${member.load}</strong></p>
      <p class="muted">Trọng tâm: ${member.focus}</p>
    `;
    grid.appendChild(card);
  });
}

function initEvents() {
  document.getElementById('project-filter-status').addEventListener('change', renderProjects);
  document.getElementById('project-filter-owner').addEventListener('change', renderProjects);
  document.getElementById('task-filter-status').addEventListener('change', renderTasks);
  document.getElementById('task-filter-squad').addEventListener('change', renderTasks);
}

renderProjects();
renderTasks();
renderTeam();
initEvents();
