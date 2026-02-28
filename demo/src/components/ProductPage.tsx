import React from 'react';

export const ProductPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: '#fff',
          color: '#333',
          borderRight: '1px solid #f0f0f0',
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          id="logo"
          style={{
            padding: '8px 24px 24px',
            fontSize: 20,
            fontWeight: 700,
            borderBottom: '1px solid #f0f0f0',
            marginBottom: 8,
          }}
        >
          Acme Pro
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'nav-dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'nav-analytics', label: 'Analytics', icon: '📈' },
            { id: 'nav-projects', label: 'Projects', icon: '📁' },
            { id: 'nav-team', label: 'Team', icon: '👥' },
          ].map((item) => (
            <div
              key={item.id}
              id={item.id}
              style={{
                padding: '12px 24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 14,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div
          id="settings-btn"
          style={{
            padding: '12px 24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 14,
            borderTop: '1px solid #f0f0f0',
          }}
        >
          ⚙️ Settings
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 36 }}>
        {/* Header */}
        <header
          style={{
            height: 56,
            background: '#fff',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            gap: 16,
          }}
        >
          <input
            id="search-input"
            type="text"
            placeholder="Search projects, docs..."
            style={{
              flex: 1,
              maxWidth: 400,
              padding: '6px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              fontSize: 14,
              outline: 'none',
            }}
          />

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              id="notification-btn"
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: 18,
                cursor: 'pointer',
                padding: 4,
              }}
            >
              🔔
            </button>
            <button
              id="create-btn"
              style={{
                background: '#1677ff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '6px 16px',
                fontSize: 14,
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              + New Project
            </button>
            <div
              id="user-avatar"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#1677ff',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              J
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 24, background: '#f5f5f5' }}>
          {/* Stats */}
          <div
            id="stats-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginBottom: 24,
            }}
          >
            {[
              { label: 'Total Projects', value: '24', change: '+3' },
              { label: 'Active Tasks', value: '142', change: '+12' },
              { label: 'Team Members', value: '8', change: '+1' },
              { label: 'Completion Rate', value: '87%', change: '+5%' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  padding: 20,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{stat.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#333' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#52c41a', marginTop: 4 }}>
                  {stat.change} this week
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div
            id="recent-list"
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 20,
              boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Recent Activity</h3>
            {[
              { title: 'Homepage Redesign', time: '2 hours ago', status: 'In Progress' },
              { title: 'API Integration', time: '5 hours ago', status: 'In Review' },
              { title: 'User Dashboard v2', time: '1 day ago', status: 'Completed' },
              { title: 'Mobile App MVP', time: '2 days ago', status: 'In Progress' },
              { title: 'Database Migration', time: '3 days ago', status: 'Completed' },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{item.time}</div>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background:
                      item.status === 'Completed'
                        ? '#f6ffed'
                        : item.status === 'In Review'
                          ? '#fff7e6'
                          : '#e6f4ff',
                    color:
                      item.status === 'Completed'
                        ? '#52c41a'
                        : item.status === 'In Review'
                          ? '#fa8c16'
                          : '#1677ff',
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
