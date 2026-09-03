import React, { useState } from 'react';
import { Search, Bell, MoreHorizontal, Home, Library, Plus, PenLine, User, Bookmark } from 'lucide-react';

const COLORS = {
  primary: '#2E5B40',
  secondary: '#A7C4A2',
  secondarySoft: '#DCE6D8',
  bg: '#F7F7F5',
  surface: '#FFFFFF',
  text: '#22281F',
  textMuted: '#6B7268',
  border: '#E4E3DD',
};

const FONT_STACK =
  "'Apple SD Gothic Neo', -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif";

const PALETTES = [
  { bg: '#12382B', fg: '#EFE7D8' },
  { bg: '#1B1B1B', fg: '#E8DCC8' },
  { bg: '#2B3F5C', fg: '#EDE6D6' },
  { bg: '#8A8F5C', fg: '#FBF8F0' },
  { bg: '#B96E4E', fg: '#FBF3E7' },
  { bg: '#4B4166', fg: '#F4DCC5' },
  { bg: '#DDD6C3', fg: '#2E5B40' },
  { bg: '#9FAE93', fg: '#22281F' },
];

const readingBooks = [
  { id: 1, title: '아무튼, 여름', author: '김신희', progress: 42, palette: 0, note: '여름은 매번 나에게 다른 질문을 던진다.', current: true },
  { id: 2, title: '인간관계론', author: '데일 카네기', progress: 67, palette: 1 },
  { id: 3, title: '도둑맞은 집중력', author: '요한 하리', progress: 39, palette: 2 },
  { id: 4, title: '단순하게 산다는 것', author: '도미니크 로로', progress: 20, palette: 3 },
  { id: 5, title: '나는 나로 살기로 했다', author: '김수현', progress: 10, palette: 4 },
  { id: 6, title: '오늘도 잘 버텨냈습니다', author: '전건우', progress: 4, palette: 5 },
];

const completedBooks = [
  { id: 7, title: '사피엔스', author: '유발 하라리', date: '2026.07.30', note: '인류는 결국 이야기를 믿는 동물이다.', palette: 6 },
  { id: 8, title: '미움받을 용기', author: '기시미 이치로', date: '2026.08.10', note: '과거는 바꿀 수 없어도, 지금은 바꿀 수 있다.', palette: 7 },
  { id: 9, title: '죽음의 수용소에서', author: '빅터 프랭클', date: '2026.08.05', note: '왜 살아야 하는지 아는 사람은 견딘다.', palette: 0 },
  { id: 10, title: '달러구트 꿈 백화점', author: '이미예', date: '2026.07.20', note: '꿈도 결국, 우리가 고르는 것이다.', palette: 1 },
];

const wishlistBooks = [
  { id: 11, title: '팩트풀니스', author: '한스 로슬링', source: '사피엔스에서 발견', palette: 2 },
  { id: 12, title: '언어의 온도', author: '이기주', source: '직접 추가', palette: 3 },
  { id: 13, title: '상실의 시대', author: '무라카미 하루키', source: '직접 추가', palette: 4 },
];

const TABS = [
  { key: 'reading', label: '읽는 중' },
  { key: 'completed', label: '완독' },
  { key: 'wishlist', label: '읽고 싶은 책' },
];

function BookCover({ palette, title, size = 'grid' }) {
  const p = PALETTES[palette % PALETTES.length];
  const isHero = size === 'hero';
  return (
    <div
      style={{
        background: p.bg,
        borderRadius: 16,
        aspectRatio: isHero ? '4 / 5' : '3 / 4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isHero ? 18 : 12,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: isHero ? 26 : 16,
          height: isHero ? 26 : 16,
          borderRadius: '50%',
          border: `1.5px solid ${p.fg}`,
          opacity: 0.55,
        }}
      />
      <div style={{ color: p.fg, fontSize: isHero ? 19 : 13, fontWeight: 600, lineHeight: 1.35, wordBreak: 'keep-all' }}>
        {title}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('reading');
  const [toast, setToast] = useState('');

  const lists = { reading: readingBooks, completed: completedBooks, wishlist: wishlistBooks };
  const activeList = lists[activeTab];
  const currentBook = readingBooks.find((b) => b.current);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1600);
  };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: FONT_STACK, minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 384, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', background: COLORS.bg }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px 12px', background: COLORS.bg }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>책장</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: COLORS.primary }}>
            <Search size={20} strokeWidth={2} />
            <Bell size={20} strokeWidth={2} />
            <MoreHorizontal size={20} strokeWidth={2} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 96, paddingLeft: 16, paddingRight: 16 }}>
          <div style={{ marginTop: 4, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500, marginBottom: 8 }}>지금 읽고 있는 책</div>

            {currentBook ? (
              <div style={{ display: 'flex', gap: 16, padding: 16, background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}` }}>
                <div style={{ width: 92, flexShrink: 0 }}>
                  <BookCover palette={currentBook.palette} title={currentBook.title} size="hero" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, paddingTop: 4, paddingBottom: 4 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, wordBreak: 'keep-all' }}>{currentBook.title}</div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{currentBook.author}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, marginTop: 8 }}>읽는 중 {currentBook.progress}%</div>
                    <div style={{ height: 6, borderRadius: 999, background: COLORS.secondarySoft, marginTop: 6 }}>
                      <div style={{ height: 6, borderRadius: 999, width: `${currentBook.progress}%`, background: COLORS.primary }} />
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8, lineHeight: 1.5 }}>{currentBook.note}</div>
                  </div>
                  <button
                    onClick={() => showToast('책 상세 화면은 다음 단계에서 만들 예정이에요')}
                    style={{ alignSelf: 'flex-start', marginTop: 12, padding: '6px 12px', background: COLORS.primary, color: '#fff', borderRadius: 999, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                  >
                    계속 읽기
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', gap: 12, background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>지금 읽고 있는 책이 없어요.</div>
                <button style={{ padding: '8px 16px', background: COLORS.primary, color: '#fff', borderRadius: 999, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  책 검색하기
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {TABS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '8px 14px',
                    borderRadius: 999,
                    background: active ? COLORS.primary : 'transparent',
                    color: active ? '#fff' : COLORS.textMuted,
                    border: active ? 'none' : `1px solid ${COLORS.border}`,
                    cursor: 'pointer',
                  }}
                >
                  {tab.label} <span style={{ opacity: 0.75 }}>{lists[tab.key].length}</span>
                </button>
              );
            })}
          </div>

          {activeList.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>아직 목록이 비어있어요.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {activeList.map((book) => (
                <button
                  key={book.id}
                  onClick={() => showToast(`"${book.title}" 상세 화면은 다음 단계에서 만들 예정이에요`)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%' }}
                >
                  <div style={{ width: '100%', position: 'relative' }}>
                    <BookCover palette={book.palette} title={book.title} />
                    {activeTab === 'wishlist' && (
                      <div style={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}>
                        <Bookmark size={16} fill="#fff" />
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8, lineHeight: 1.3, wordBreak: 'keep-all' }}>{book.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{book.author}</div>

                  {activeTab === 'reading' && (
                    <div style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600, marginTop: 4 }}>{book.progress}%</div>
                  )}
                  {activeTab === 'completed' && (
                    <>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>완독일 {book.date}</div>
                      <div style={{ fontSize: 12, color: COLORS.text, marginTop: 4, lineHeight: 1.4, wordBreak: 'keep-all' }}>"{book.note}"</div>
                    </>
                  )}
                  {activeTab === 'wishlist' && (
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{book.source}</div>
                  )}
                </button>
              ))}

              <button
                onClick={() => showToast('책 등록 화면은 다음 단계에서 만들 예정이에요')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, aspectRatio: '3 / 4', borderRadius: 16, border: `1.5px dashed ${COLORS.secondary}`, color: COLORS.primary, background: 'none', cursor: 'pointer' }}
              >
                <Plus size={22} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>책 추가하기</span>
              </button>
            </div>
          )}
        </div>

        {toast && (
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 88, background: COLORS.text, color: '#fff', fontSize: 12, padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>
            {toast}
          </div>
        )}

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: COLORS.surface, borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: COLORS.primary }}>
            <Home size={20} fill={COLORS.primary} />
            <span style={{ fontSize: 10, marginTop: 2, fontWeight: 600 }}>홈</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: COLORS.textMuted }}>
            <Library size={20} />
            <span style={{ fontSize: 10, marginTop: 2 }}>책장</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: COLORS.primary, color: '#fff', marginTop: -16 }}>
            <Plus size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: COLORS.textMuted }}>
            <PenLine size={20} />
            <span style={{ fontSize: 10, marginTop: 2 }}>기록</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: COLORS.textMuted }}>
            <User size={20} />
            <span style={{ fontSize: 10, marginTop: 2 }}>내 정보</span>
          </div>
        </div>
      </div>
    </div>
  );
}
