import React, { useState } from 'react';
import {
  Search, Bell, MoreHorizontal, Home, Library, Plus, PenLine, User, Bookmark,
  ArrowLeft, Camera, ChevronDown,
} from 'lucide-react';

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

const sampleRecords = [
  { id: 'r1', date: '2025.08.29', text: '이 책을 읽으면서 나는 사람을 이해하는 일이 얼마나 어렵고, 또 중요한 일인지 다시 한번 느꼈다. 특히 "모든 사람은 저마다의 사정이 있다"라는 문장이 계속 마음에 남았다.' },
  { id: 'r2', date: '2025.08.27', text: '유년 시절의 한 장면이 한 사람의 태도와 세계관을 어떻게 만드는지 다시 생각해봤다.' },
  { id: 'r3', date: '2025.08.24', text: '주인공의 두려움이 오히려 담담하게 와닿았다. 내가 느끼는 두려움은 무엇일까?' },
  { id: 'r4', date: '2025.08.20', text: '처음 인상은 담백했지만, 읽을수록 문장이 섬세하다는 걸 느낀다.' },
];

const readingBooks = [
  { id: 1, title: '아무튼, 여름', author: '김신희', progress: 42, palette: 0, note: '여름은 매번 나에게 다른 질문을 던진다.', current: true, records: { 1: sampleRecords, 2: [], 3: [] } },
  { id: 2, title: '인간관계론', author: '데일 카네기', progress: 67, palette: 1, records: { 1: [], 2: [], 3: [] } },
  { id: 3, title: '도둑맞은 집중력', author: '요한 하리', progress: 39, palette: 2, records: { 1: [], 2: [], 3: [] } },
  { id: 4, title: '단순하게 산다는 것', author: '도미니크 로로', progress: 20, palette: 3, records: { 1: [], 2: [], 3: [] } },
  { id: 5, title: '나는 나로 살기로 했다', author: '김수현', progress: 10, palette: 4, records: { 1: [], 2: [], 3: [] } },
  { id: 6, title: '오늘도 잘 버텨냈습니다', author: '전건우', progress: 4, palette: 5, records: { 1: [], 2: [], 3: [] } },
];

const completedBooks = [
  { id: 7, title: '사피엔스', author: '유발 하라리', date: '2026.07.30', note: '인류는 결국 이야기를 믿는 동물이다.', palette: 6, records: { 1: sampleRecords.slice(0, 2), 2: [], 3: [] } },
  { id: 8, title: '미움받을 용기', author: '기시미 이치로', date: '2026.08.10', note: '과거는 바꿀 수 없어도, 지금은 바꿀 수 있다.', palette: 7, records: { 1: [], 2: [], 3: [] } },
  { id: 9, title: '죽음의 수용소에서', author: '빅터 프랭클', date: '2026.08.05', note: '왜 살아야 하는지 아는 사람은 견딘다.', palette: 0, records: { 1: [], 2: [], 3: [] } },
  { id: 10, title: '달러구트 꿈 백화점', author: '이미예', date: '2026.07.20', note: '꿈도 결국, 우리가 고르는 것이다.', palette: 1, records: { 1: [], 2: [], 3: [] } },
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
      <div style={{ width: isHero ? 26 : 16, height: isHero ? 26 : 16, borderRadius: '50%', border: `1.5px solid ${p.fg}`, opacity: 0.55 }} />
      <div style={{ color: p.fg, fontSize: isHero ? 19 : 13, fontWeight: 600, lineHeight: 1.35, wordBreak: 'keep-all' }}>
        {title}
      </div>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 88, background: COLORS.text, color: '#fff', fontSize: 12, padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap', zIndex: 20 }}>
      {message}
    </div>
  );
}

function HomeScreen({ onSelectBook, showToast }) {
  const [activeTab, setActiveTab] = useState('reading');
  const lists = { reading: readingBooks, completed: completedBooks, wishlist: wishlistBooks };
  const activeList = lists[activeTab];
  const currentBook = readingBooks.find((b) => b.current);

  const handleCardClick = (book) => {
    if (activeTab === 'wishlist') {
      showToast('책 상세는 등록 후에 볼 수 있어요');
      return;
    }
    onSelectBook(book, activeTab);
  };

  return (
    <>
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
                  onClick={() => onSelectBook(currentBook, 'reading')}
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
                  fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 999,
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
                onClick={() => handleCardClick(book)}
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
    </>
  );
}

function BookDetailScreen({ book, status, onBack, showToast }) {
  const [round, setRound] = useState(1);
  const [note, setNote] = useState(book.note || '');
  const [editingNote, setEditingNote] = useState(false);

  const p = PALETTES[book.palette % PALETTES.length];
  const records = (book.records && book.records[round]) || [];

  return (
    <>
      {/* 테마 이미지 배경 영역 */}
      <div style={{ position: 'relative', height: 180, background: p.bg, flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px' }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.16)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} color="#fff" />
          </button>
          <button
            onClick={() => showToast('테마 이미지 변경은 다음 단계에서 만들 예정이에요')}
            style={{ background: 'rgba(255,255,255,0.16)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <MoreHorizontal size={18} color="#fff" />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
        {/* 책 표지 + 타이틀 (배경에 걸치도록) */}
        <div style={{ padding: '0 16px', marginTop: -56 }}>
          <div style={{ width: 96 }}>
            <BookCover palette={book.palette} title={book.title} size="hero" />
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 19, fontWeight: 700, wordBreak: 'keep-all' }}>{book.title}</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{book.author}</div>

            {status === 'reading' ? (
              <>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, marginTop: 10 }}>읽는 중 {book.progress}%</div>
                <div style={{ height: 6, borderRadius: 999, background: COLORS.secondarySoft, marginTop: 6, maxWidth: 240 }}>
                  <div style={{ height: 6, borderRadius: 999, width: `${book.progress}%`, background: COLORS.primary }} />
                </div>
              </>
            ) : (
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 10 }}>완독일 {book.date}</div>
            )}
          </div>

          {status === 'completed' && (
            <div style={{ marginTop: 16, padding: 14, background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600, marginBottom: 6 }}>나에게 남은 한 줄</div>
              {editingNote ? (
                <div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    style={{ width: '100%', fontSize: 13, color: COLORS.text, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8, fontFamily: FONT_STACK, resize: 'none' }}
                  />
                  <button
                    onClick={() => setEditingNote(false)}
                    style={{ marginTop: 8, padding: '6px 12px', background: COLORS.primary, color: '#fff', border: 'none', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                  >
                    저장
                  </button>
                </div>
              ) : (
                <div onClick={() => setEditingNote(true)} style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5, cursor: 'pointer' }}>
                  {note || '탭해서 한 줄을 남겨보세요'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 회독 탭 */}
        <div style={{ display: 'flex', gap: 20, padding: '20px 16px 0', borderBottom: `1px solid ${COLORS.border}`, marginTop: 20 }}>
          {[1, 2, 3].map((r) => (
            <button
              key={r}
              onClick={() => setRound(r)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', paddingBottom: 10,
                fontSize: 14, fontWeight: round === r ? 700 : 500,
                color: round === r ? COLORS.text : COLORS.textMuted,
                borderBottom: round === r ? `2px solid ${COLORS.primary}` : '2px solid transparent',
              }}
            >
              {r}회독
            </button>
          ))}
        </div>

        {/* 기록 목록 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>기록 {records.length}개</div>
          {records.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, color: COLORS.textMuted }}>
              최신순 <ChevronDown size={14} />
            </div>
          )}
        </div>

        {/* 기록 리스트 */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {records.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>{round}회독에는 아직 기록이 없어요.</div>
            </div>
          ) : (
            records.map((rec) => (
              <button
                key={rec.id}
                onClick={() => showToast('기록 상세 화면은 다음 단계에서 만들 예정이에요')}
                style={{ textAlign: 'left', background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 14, cursor: 'pointer' }}
              >
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 6 }}>{rec.date}</div>
                <div
                  style={{
                    fontSize: 13, color: COLORS.text, lineHeight: 1.55,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}
                >
                  {rec.text}
                </div>
              </button>
            ))
          )}
        </div>

        {/* 새 기록 시작하기 */}
        <div style={{ padding: '20px 16px 0' }}>
          <button
            onClick={() => showToast('기록 작성 화면은 다음 단계에서 만들 예정이에요')}
            style={{ width: '100%', padding: '13px 0', background: COLORS.primary, color: '#fff', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <PenLine size={16} />
            새 기록 시작하기
          </button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1600);
  };

  const handleSelectBook = (book, status) => {
    setSelected({ book, status });
    setScreen('detail');
  };

  const handleBack = () => {
    setScreen('home');
    setSelected(null);
  };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: FONT_STACK, minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 384, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', background: COLORS.bg }}>
        {screen === 'home' && <HomeScreen onSelectBook={handleSelectBook} showToast={showToast} />}
        {screen === 'detail' && selected && (
          <BookDetailScreen book={selected.book} status={selected.status} onBack={handleBack} showToast={showToast} />
        )}
        <Toast message={toast} />
      </div>
    </div>
  );
}
