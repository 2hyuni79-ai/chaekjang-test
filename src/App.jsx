import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Bell, MoreHorizontal, Home, Library, Plus, Heart, User, Bookmark,
  ArrowLeft, ChevronDown, PenLine, RefreshCw, ScanLine, Keyboard, CameraOff, Camera,
  Lightbulb, HelpCircle, Sparkles,
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
  danger: '#B3261E',
};

const AI_BG = '#EFEDF8';
const AI_BORDER = '#DCD8ED';

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

const GENRES = ['소설', '자기계발', '시/에세이', '심리학', '과학', '경제/경영', '마케팅', '기타'];

const emptyRound = () => ({ status: 'empty', blocks: [], completedDate: null, questions: [] });

const seededRound1 = {
  status: 'completed',
  completedDate: '2025.08.29',
  blocks: [
    { id: 'b1', kind: 'quote', quoteText: '모든 사람은 저마다의 사정이 있다.', thoughtText: '이 문장을 읽으면서 나는 사람을 이해하는 일이 얼마나 어렵고, 또 중요한 일인지 다시 한번 느꼈다.' },
    { id: 'b2', kind: 'free', text: '유년 시절의 한 장면이 한 사람의 태도와 세계관을 어떻게 만드는지 다시 생각해봤다. 주인공의 두려움이 오히려 담담하게 와닿았다. 내가 느끼는 두려움은 무엇일까?' },
    { id: 'b3', kind: 'tag', label: '새롭게 알게 된 부분', text: '처음 인상은 담백했지만, 읽을수록 문장이 섬세하다는 걸 느낀다.' },
  ],
  questions: [
    { id: 'q1', text: '이 책을 통해 새롭게 바라보게 된 가치관은 무엇인가요?', answer: '' },
    { id: 'q2', text: '주인공의 선택을 나라면 어떻게 했을지 생각해볼 수 있나요?', answer: '' },
    { id: 'q3', text: '이 책이 지금의 나에게 던지고자 하는 메시지는 무엇일까요?', answer: '' },
  ],
};

const initialReading = [
  { id: 1, title: '아무튼, 여름', author: '김신희', progress: 42, palette: 0, note: '여름은 매번 나에게 다른 질문을 던진다.', current: true, isFavoriteBook: false, records: { 1: seededRound1, 2: emptyRound(), 3: emptyRound() } },
  { id: 2, title: '인간관계론', author: '데일 카네기', progress: 67, palette: 1, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
  { id: 3, title: '도둑맞은 집중력', author: '요한 하리', progress: 39, palette: 2, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
  { id: 4, title: '단순하게 산다는 것', author: '도미니크 로로', progress: 20, palette: 3, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
  { id: 5, title: '나는 나로 살기로 했다', author: '김수현', progress: 10, palette: 4, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
  { id: 6, title: '오늘도 잘 버텨냈습니다', author: '전건우', progress: 4, palette: 5, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
];

const initialCompleted = [
  { id: 7, title: '사피엔스', author: '유발 하라리', date: '2026.07.30', note: '인류는 결국 이야기를 믿는 동물이다.', palette: 6, isFavoriteBook: true, records: { 1: { status: 'completed', completedDate: '2026.07.30', blocks: [{ id: 'b1', kind: 'free', text: '인류는 결국 이야기를 믿는 동물이다. 화폐, 국가, 종교 모두 우리가 함께 믿기로 한 이야기일 뿐이라는 게 계속 마음에 남았다.' }], questions: [] }, 2: emptyRound(), 3: emptyRound() } },
  { id: 8, title: '미움받을 용기', author: '기시미 이치로', date: '2026.08.10', note: '과거는 바꿀 수 없어도, 지금은 바꿀 수 있다.', palette: 7, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
  { id: 9, title: '죽음의 수용소에서', author: '빅터 프랭클', date: '2026.08.05', note: '왜 살아야 하는지 아는 사람은 견딘다.', palette: 0, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
  { id: 10, title: '달러구트 꿈 백화점', author: '이미예', date: '2026.07.20', note: '꿈도 결국, 우리가 고르는 것이다.', palette: 1, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
];

const initialPaused = [
  { id: 14, title: '코스모스', author: '칼 세이건', progress: 31, pausedDate: '2026.06.02', stoppedReason: '지금의 나에게는 이해하기 어려웠다.', palette: 2, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
  { id: 15, title: '총, 균, 쇠', author: '재레드 다이아몬드', progress: 18, pausedDate: '2026.05.14', stoppedReason: '나중에 다시 읽고 싶어 잠시 멈췄다.', palette: 5, isFavoriteBook: false, records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() } },
];

const initialWishlist = [
  { id: 11, title: '팩트풀니스', author: '한스 로슬링', source: '사피엔스에서 발견', palette: 2, isFavoriteBook: false },
  { id: 12, title: '언어의 온도', author: '이기주', source: '직접 추가', palette: 3, isFavoriteBook: false },
  { id: 13, title: '상실의 시대', author: '무라카미 하루키', source: '직접 추가', palette: 4, isFavoriteBook: false },
];

const TABS = [
  { key: 'reading', label: '읽는 중' },
  { key: 'completed', label: '완독' },
  { key: 'wishlist', label: '읽고 싶은 책' },
  { key: 'paused', label: '중단' },
];

const STATUS_LABEL = { reading: '읽는 중', completed: '완독', wishlist: '읽고 싶은 책', paused: '중단' };

const TAG_OPTIONS = [
  { label: '새롭게 알게 된 부분', Icon: Lightbulb },
  { label: '나에게 던지는 질문', Icon: HelpCircle },
  { label: '감정/느낌', Icon: Heart },
  { label: '떠오른 생각', Icon: Sparkles },
];

function tagIcon(label) {
  const found = TAG_OPTIONS.find((t) => t.label === label);
  return found ? found.Icon : Lightbulb;
}

function blocksPreviewText(blocks) {
  const b = blocks.find((x) => (x.kind === 'free' && x.text) || (x.kind === 'tag' && x.text) || (x.kind === 'quote' && x.thoughtText));
  if (!b) return '';
  return b.kind === 'quote' ? b.thoughtText : b.text;
}

function BookCover({ palette, title, imageUrl, size = 'grid' }) {
  const [imgError, setImgError] = useState(false);
  const p = PALETTES[palette % PALETTES.length];
  const isHero = size === 'hero';
  const showImage = !!imageUrl && !imgError;

  return (
    <div style={{ position: 'relative', borderRadius: 16, aspectRatio: isHero ? '4 / 5' : '3 / 4', overflow: 'hidden', background: p.bg }}>
      {showImage ? (
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: isHero ? 18 : 12 }}>
          <div style={{ width: isHero ? 26 : 16, height: isHero ? 26 : 16, borderRadius: '50%', border: `1.5px solid ${p.fg}`, opacity: 0.55 }} />
          <div style={{ color: p.fg, fontSize: isHero ? 19 : 13, fontWeight: 600, lineHeight: 1.35, wordBreak: 'keep-all' }}>
            {title}
          </div>
        </div>
      )}
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 88, background: COLORS.text, color: '#fff', fontSize: 12, padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap', zIndex: 20, textAlign: 'center', maxWidth: '85%' }}>
      {message}
    </div>
  );
}

/* ---------- 홈 화면 ---------- */
function HomeScreen({ books, onSelectBook, onAddBook, showToast }) {
  const [activeTab, setActiveTab] = useState('reading');
  const activeList = books[activeTab];
  const currentBook = books.reading.find((b) => b.current);

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
        <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 16 }}>오늘 하루도 당신 거예요</div>

        <div style={{ marginTop: 4, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500, marginBottom: 8 }}>지금 읽고 있는 책</div>
          {currentBook ? (
            <div style={{ display: 'flex', gap: 16, padding: 16, background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}` }}>
              <div style={{ width: 92, flexShrink: 0 }}>
                <BookCover palette={currentBook.palette} title={currentBook.title} imageUrl={currentBook.coverImageUrl} size="hero" />
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
              <button onClick={onAddBook} style={{ padding: '8px 16px', background: COLORS.primary, color: '#fff', borderRadius: 999, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                책 검색하기
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
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
                {tab.label} <span style={{ opacity: 0.75 }}>{books[tab.key].length}</span>
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
                  <BookCover palette={book.palette} title={book.title} imageUrl={book.coverImageUrl} />
                  {book.isFavoriteBook && (
                    <div style={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}>
                      <Heart size={16} fill="#fff" />
                    </div>
                  )}
                  {activeTab === 'wishlist' && !book.isFavoriteBook && (
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
                {activeTab === 'paused' && (
                  <>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600, marginTop: 4 }}>{book.progress}%까지 읽음</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>중단일 {book.pausedDate}</div>
                  </>
                )}
              </button>
            ))}
            <button
              onClick={onAddBook}
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
        <button onClick={onAddBook} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: COLORS.primary, color: '#fff', marginTop: -16, border: 'none', cursor: 'pointer' }}>
          <Plus size={22} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: COLORS.textMuted }}>
          <Heart size={20} />
          <span style={{ fontSize: 10, marginTop: 2 }}>인생책</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: COLORS.textMuted }}>
          <User size={20} />
          <span style={{ fontSize: 10, marginTop: 2 }}>내 정보</span>
        </div>
      </div>
    </>
  );
}

/* ---------- 책 상세 화면 ---------- */
function BookDetailScreen({ book, status, onBack, onOpenRecord, showToast }) {
  const [round, setRound] = useState(1);
  const [note, setNote] = useState(book.note || '');
  const [editingNote, setEditingNote] = useState(false);

  const p = PALETTES[book.palette % PALETTES.length];
  const roundData = book.records[round];
  const preview = blocksPreviewText(roundData.blocks);

  return (
    <>
      <div style={{ position: 'relative', height: 180, background: p.bg, flexShrink: 0, overflow: 'hidden' }}>
        {book.coverImageUrl && (
          <img
            src={book.coverImageUrl}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(2px) brightness(0.7)', transform: 'scale(1.1)' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px' }}>
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.16)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} color="#fff" />
          </button>
          <button
            onClick={() => showToast('개인 테마 이미지 변경은 다음 단계에서 만들 예정이에요')}
            style={{ background: 'rgba(255,255,255,0.16)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <MoreHorizontal size={18} color="#fff" />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
        <div style={{ padding: '0 16px', marginTop: -56 }}>
          <div style={{ width: 96 }}>
            <BookCover palette={book.palette} title={book.title} imageUrl={book.coverImageUrl} size="hero" />
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 19, fontWeight: 700, wordBreak: 'keep-all' }}>{book.title}</div>
              {book.isFavoriteBook && <Heart size={16} color={COLORS.primary} fill={COLORS.primary} />}
            </div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{book.author}</div>

            {status === 'reading' && (
              <>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, marginTop: 10 }}>읽는 중 {book.progress}%</div>
                <div style={{ height: 6, borderRadius: 999, background: COLORS.secondarySoft, marginTop: 6, maxWidth: 240 }}>
                  <div style={{ height: 6, borderRadius: 999, width: `${book.progress}%`, background: COLORS.primary }} />
                </div>
              </>
            )}
            {status === 'paused' && (
              <>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginTop: 10 }}>중단 · {book.progress}%까지 읽음</div>
                <div style={{ height: 6, borderRadius: 999, background: COLORS.secondarySoft, marginTop: 6, maxWidth: 240 }}>
                  <div style={{ height: 6, borderRadius: 999, width: `${book.progress}%`, background: COLORS.textMuted }} />
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>중단일 {book.pausedDate}</div>
                {book.stoppedReason && (
                  <div style={{ fontSize: 12, color: COLORS.text, marginTop: 4, lineHeight: 1.4 }}>"{book.stoppedReason}"</div>
                )}
              </>
            )}
            {status === 'completed' && (
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

        <div style={{ padding: '20px 16px 0' }}>
          {roundData.status === 'empty' ? (
            <button
              onClick={() => onOpenRecord(round, 'edit')}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '40px 20px', background: COLORS.surface, border: `1.5px dashed ${COLORS.secondary}`, borderRadius: 16, cursor: 'pointer' }}
            >
              <PenLine size={20} color={COLORS.primary} />
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary }}>{round}회독 기록 시작하기</span>
            </button>
          ) : (
            <div style={{ width: '100%', textAlign: 'left', background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16 }}>
              {roundData.status === 'completed' && (
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>완료 · {roundData.completedDate}</div>
              )}
              {roundData.status === 'active' && (
                <div style={{ fontSize: 11, color: COLORS.primary, marginBottom: 8 }}>작성 중</div>
              )}
              <div
                style={{
                  fontSize: 14, color: COLORS.text, lineHeight: 1.7,
                  display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}
              >
                {preview || '탭해서 이어서 써보세요'}
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                {roundData.status === 'completed' && (
                  <button onClick={() => onOpenRecord(round, 'read')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>
                    다시 읽기 →
                  </button>
                )}
                <button onClick={() => onOpenRecord(round, 'edit')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>
                  이어서 쓰기 →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- 선택지 행 UI ---------- */
function OptionRow({ Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '13px 14px', marginBottom: 8, borderRadius: 12,
        border: `1px solid ${COLORS.border}`, background: COLORS.surface, cursor: 'pointer',
      }}
    >
      <Icon size={18} color={COLORS.primary} />
      <span style={{ flex: 1, textAlign: 'left', fontSize: 14, fontWeight: 600, color: COLORS.text }}>{label}</span>
      <Plus size={16} color={COLORS.textMuted} />
    </button>
  );
}

function CaptureRow({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '13px 14px', marginTop: 4, borderRadius: 12,
        border: 'none', background: COLORS.secondarySoft, cursor: 'pointer',
      }}
    >
      <Camera size={18} color={COLORS.primary} />
      <span style={{ flex: 1, textAlign: 'left', fontSize: 14, fontWeight: 700, color: COLORS.primary }}>문장 가져오기</span>
    </button>
  );
}

/* ---------- 기록 작성 화면 ---------- */
function RecordScreen({ book, round, roundData, mode, onBack, onUpdateBlocks, onComplete, onGoToQuestions, showToast }) {
  const [blocks, setBlocks] = useState(
    roundData.blocks.length ? roundData.blocks : [{ id: `blk-${Date.now()}`, kind: 'free', text: '' }]
  );
  const isCompleted = roundData.status === 'completed';
  const readOnlyMode = mode === 'read';

  const commit = (newBlocks) => {
    setBlocks(newBlocks);
    onUpdateBlocks(round, newBlocks);
  };

  const updateBlockText = (id, field, value) => {
    commit(blocks.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  };

  const addTagBlock = (label) => {
    commit([...blocks, { id: `blk-${Date.now()}`, kind: 'tag', label, text: '' }]);
  };

  const handleComplete = () => {
    if (!window.confirm('이번 회독 기록을 완료할까요?\n(완료 후에도 이어서 쓸 수 있어요)')) return;
    onComplete(round);
  };

  const sortedQuestions = roundData.questions.length
    ? [...roundData.questions].sort((a, b) => (a.answer ? 0 : 1) - (b.answer ? 0 : 1))
    : [];

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 16px 10px', background: COLORS.bg }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: COLORS.text, display: 'flex', alignItems: 'center', gap: 10 }}>
          <ArrowLeft size={20} />
          <span style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500 }}>{book.title} · {round}회독</span>
        </button>
        <span style={{ fontSize: 11, color: COLORS.textMuted }}>{readOnlyMode ? '읽기 전용' : isCompleted ? '완료됨' : '자동 저장됨'}</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 32px' }}>
        {blocks.map((block, idx) => {
          if (block.kind === 'free') {
            return readOnlyMode ? (
              <div key={block.id} style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, whiteSpace: 'pre-wrap', marginBottom: 20 }}>
                {block.text}
              </div>
            ) : (
              <textarea
                key={block.id}
                value={block.text}
                onChange={(e) => updateBlockText(block.id, 'text', e.target.value)}
                placeholder={idx === 0 ? '무엇이든 편하게 적어보세요' : ''}
                rows={Math.max(4, Math.ceil(block.text.length / 28))}
                style={{
                  width: '100%', border: 'none', outline: 'none', resize: 'vertical',
                  fontFamily: FONT_STACK, fontSize: 16, lineHeight: 1.8, color: COLORS.text,
                  background: 'transparent', padding: 0, marginBottom: 20,
                }}
              />
            );
          }
          if (block.kind === 'tag') {
            const Icon = tagIcon(block.label);
            return (
              <div key={block.id} style={{ marginBottom: 20 }}>
                <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Icon size={14} color={COLORS.primary} />
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>{block.label}</div>
                  </div>
                  {readOnlyMode ? (
                    <div style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, whiteSpace: 'pre-wrap' }}>{block.text}</div>
                  ) : (
                    <textarea
                      value={block.text}
                      onChange={(e) => updateBlockText(block.id, 'text', e.target.value)}
                      rows={Math.max(2, Math.ceil(block.text.length / 28))}
                      style={{
                        width: '100%', border: 'none', outline: 'none', resize: 'vertical',
                        fontFamily: FONT_STACK, fontSize: 15, lineHeight: 1.8, color: COLORS.text,
                        background: 'transparent', padding: 0,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          }
          if (block.kind === 'quote') {
            return (
              <div key={block.id} style={{ marginBottom: 20 }}>
                <div style={{ borderLeft: `3px solid ${COLORS.secondary}`, paddingLeft: 14, marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontStyle: 'italic', color: COLORS.text, lineHeight: 1.7 }}>
                    "{block.quoteText}"
                  </div>
                </div>
                {readOnlyMode ? (
                  <div style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.text, whiteSpace: 'pre-wrap' }}>{block.thoughtText}</div>
                ) : (
                  <textarea
                    value={block.thoughtText}
                    onChange={(e) => updateBlockText(block.id, 'thoughtText', e.target.value)}
                    placeholder="이 문장에 대한 내 생각"
                    rows={Math.max(2, Math.ceil((block.thoughtText || '').length / 28))}
                    style={{
                      width: '100%', border: 'none', outline: 'none', resize: 'vertical',
                      fontFamily: FONT_STACK, fontSize: 15, lineHeight: 1.8, color: COLORS.text,
                      background: 'transparent', padding: 0,
                    }}
                  />
                )}
              </div>
            );
          }
          return null;
        })}

        {!readOnlyMode && (
          <div style={{ marginTop: 8, marginBottom: 28 }}>
            {TAG_OPTIONS.map((opt) => (
              <OptionRow key={opt.label} Icon={opt.Icon} label={opt.label} onClick={() => addTagBlock(opt.label)} />
            ))}
            <CaptureRow onClick={() => showToast('OCR 촬영 기능은 다음 단계에서 만들 예정이에요')} />
          </div>
        )}

        {!readOnlyMode && !isCompleted && (
          <button
            onClick={handleComplete}
            style={{ width: '100%', padding: '13px 0', background: COLORS.primary, color: '#fff', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            기록 완료
          </button>
        )}

        {isCompleted && (
          <div style={{ marginTop: 8, padding: 16, background: AI_BG, border: `1px solid ${AI_BORDER}`, borderRadius: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: COLORS.text }}>AI 질문</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 16 }}>
              실제 AI 연결은 다음 단계에서 진행할 예정이라, 지금은 예시 질문이에요.
            </div>
            {sortedQuestions.map((q) => (
              <div key={q.id} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 6, lineHeight: 1.5 }}>{q.text}</div>
                <div style={{ fontSize: 13, color: q.answer ? COLORS.text : COLORS.textMuted, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {q.answer || '아직 답변하지 않았어요'}
                </div>
              </div>
            ))}
            {!readOnlyMode && (
              <button
                onClick={() => onGoToQuestions(round)}
                style={{ marginTop: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, color: COLORS.primary, fontWeight: 700 }}
              >
                질문에 답하기 →
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ---------- AI 질문 페이지 ---------- */
function AIQuestionScreen({ book, round, roundData, onUpdateAnswer, onClose }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: AI_BG }}>
      <div style={{ padding: '20px 16px 8px' }}>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 2 }}>{book.title} · {round}회독</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.text }}>AI 질문</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 24px' }}>
        {roundData.questions.map((q) => (
          <div key={q.id} style={{ marginBottom: 26 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 10, lineHeight: 1.5 }}>{q.text}</div>
            <textarea
              value={q.answer}
              onChange={(e) => onUpdateAnswer(round, q.id, e.target.value)}
              placeholder="여기에 답변을 작성해주세요 (답하지 않아도 괜찮아요)"
              rows={3}
              style={{
                width: '100%', border: `1px solid ${AI_BORDER}`, borderRadius: 12, padding: 12,
                fontFamily: FONT_STACK, fontSize: 14, color: COLORS.text, background: COLORS.surface, resize: 'none',
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 16px 24px' }}>
        <button
          onClick={onClose}
          style={{ width: '100%', padding: '13px 0', background: COLORS.primary, color: '#fff', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

/* ---------- 책 추가 방식 선택 ---------- */
function AddChoiceScreen({ onScan, onManual, onCancel }) {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, padding: '20px 16px 12px', background: COLORS.bg }}>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: COLORS.text }}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>책 추가하기</h1>
      </div>

      <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={onScan}
          style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ScanLine size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>바코드로 스캔하기</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>책 뒤표지 바코드를 카메라로 인식해요</div>
          </div>
        </button>

        <button
          onClick={onManual}
          style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.secondarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Keyboard size={22} color={COLORS.primary} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>직접 입력하기</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>제목부터 하나씩 직접 써서 등록해요</div>
          </div>
        </button>
      </div>
    </>
  );
}

/* ---------- 바코드 스캔 화면 ---------- */
function ScanScreen({ onDetected, onCancel, showToast }) {
  const scannerInstanceRef = useRef(null);
  const [status, setStatus] = useState('starting');

  useEffect(() => {
    let cancelled = false;

    import('html5-qrcode').then(({ Html5Qrcode }) => {
      if (cancelled) return;
      const html5QrCode = new Html5Qrcode('barcode-reader');
      scannerInstanceRef.current = html5QrCode;

      html5QrCode
        .start(
          { facingMode: 'environment' },
          {
            fps: 10,
            experimentalFeatures: {
              useBarCodeDetectorIfSupported: false,
            },
          },
          (decodedText) => {
            html5QrCode
              .stop()
              .then(() => html5QrCode.clear())
              .catch(() => {})
              .finally(() => {
                onDetected(decodedText);
              });
          },
          () => {}
        )
        .then(() => {
          if (!cancelled) setStatus('scanning');
        })
        .catch(() => {
          if (!cancelled) setStatus('error');
        });
    });

    return () => {
      cancelled = true;
      const inst = scannerInstanceRef.current;
      if (inst) {
        inst.stop().then(() => inst.clear()).catch(() => {});
      }
    };
  }, []);

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, padding: '20px 16px 12px', background: COLORS.bg }}>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: COLORS.text }}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>바코드 스캔</h1>
      </div>

      <div style={{ flex: 1, padding: '8px 16px 24px', display: 'flex', flexDirection: 'column' }}>
        {status === 'error' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '48px 16px', background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}`, textAlign: 'center' }}>
            <CameraOff size={28} color={COLORS.textMuted} />
            <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>카메라를 사용할 수 없어요</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>
              브라우저 카메라 권한을 허용했는지 확인해주세요.
              또는 아래 버튼으로 직접 입력할 수 있어요.
            </div>
            <button
              onClick={onCancel}
              style={{ marginTop: 4, padding: '10px 18px', background: COLORS.primary, color: '#fff', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              뒤로 가기
            </button>
          </div>
        ) : (
          <>
            <div
              id="barcode-reader"
              style={{ width: '100%', borderRadius: 16, overflow: 'hidden', background: '#000', minHeight: 240 }}
            />
            <div style={{ fontSize: 12, color: COLORS.textMuted, textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
              바코드가 화면에 크고 선명하게 보이도록 대주세요 (너무 가깝거나 기울어지지 않게).
              <br />
              {status === 'starting' ? '카메라를 여는 중이에요...' : '자동으로 인식돼요.'}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ---------- 필드 헬퍼 ---------- */
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  fontSize: 14,
  color: COLORS.text,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: '10px 12px',
  fontFamily: FONT_STACK,
  background: COLORS.surface,
  boxSizing: 'border-box',
};

/* ---------- 책 정보 저장 화면 ---------- */
function BookFormScreen({ onCancel, onSave, showToast, initialIsbn }) {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [isbn, setIsbn] = useState(initialIsbn || '');
  const [author, setAuthor] = useState('');
  const [translator, setTranslator] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState(GENRES[0]);
  const [status, setStatus] = useState('wishlist');
  const [isFavoriteBook, setIsFavoriteBook] = useState(false);
  const [totalPages, setTotalPages] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [completedDate, setCompletedDate] = useState('');
  const [completionOneLine, setCompletionOneLine] = useState('');
  const [stoppedDate, setStoppedDate] = useState('');
  const [stoppedReason, setStoppedReason] = useState('');
  const [paletteIndex, setPaletteIndex] = useState(Math.floor(Math.random() * PALETTES.length));
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [lookupStatus, setLookupStatus] = useState('idle');

  const lookupIsbn = async (isbnRaw) => {
    const cleanIsbn = (isbnRaw || '').replace(/[^0-9Xx]/g, '');
    if (!cleanIsbn) return;
    setLookupStatus('loading');
    try {
      const url = `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=2d75eb13b9b6aebddf16a87cf0578ea64efc69aa13b56b0c02dab564002dbda9&result_style=json&page_no=1&page_size=1&isbn=${cleanIsbn}`;
      const res = await fetch(url);
      const data = await res.json();
      const book = data && data.docs && data.docs[0];
      if (book && Number(data.TOTAL_COUNT) > 0) {
        if (book.TITLE) setTitle(book.TITLE.trim());
        if (book.AUTHOR) setAuthor(book.AUTHOR.trim());
        if (book.PUBLISHER) setPublisher(book.PUBLISHER.trim());
        const dateStr = book.REAL_PUBLISH_DATE || book.PUBLISH_PREDATE || '';
        if (dateStr && dateStr.length >= 4) setYear(dateStr.slice(0, 4));
        if (book.PAGE) {
          const pageMatch = book.PAGE.match(/\d+/);
          if (pageMatch) setTotalPages(pageMatch[0]);
        }
        if (book.TITLE_URL) setCoverImageUrl(book.TITLE_URL);
        setLookupStatus('success');
      } else {
        setLookupStatus('notfound');
      }
    } catch (e) {
      setLookupStatus('error');
    }
  };

  useEffect(() => {
    if (initialIsbn) {
      lookupIsbn(initialIsbn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statuses = [
    { key: 'wishlist', label: '읽고 싶은 책' },
    { key: 'reading', label: '읽는 중' },
    { key: 'completed', label: '완독' },
    { key: 'paused', label: '중단' },
  ];

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    onSave({
      title: title.trim(),
      author: author.trim(),
      translator: translator.trim(),
      publisher: publisher.trim(),
      year: year.trim(),
      genre,
      status,
      isFavoriteBook,
      totalPages: totalPages ? Number(totalPages) : 0,
      currentPage: currentPage ? Number(currentPage) : 0,
      completedDate,
      completionOneLine: completionOneLine.trim(),
      stoppedDate,
      stoppedReason: stoppedReason.trim(),
      palette: paletteIndex,
      coverImageUrl: coverImageUrl.trim(),
      isbn: isbn.trim(),
    });
  };

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, padding: '20px 16px 12px', background: COLORS.bg }}>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: COLORS.text }}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>책 정보 저장</h1>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 32px' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          <div style={{ width: 96, flexShrink: 0 }}>
            <BookCover palette={paletteIndex} title={title || '표지'} imageUrl={coverImageUrl} size="hero" />
            {!coverImageUrl && (
              <button
                onClick={() => setPaletteIndex((paletteIndex + 1) % PALETTES.length)}
                style={{ marginTop: 8, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 11, color: COLORS.primary, background: 'none', border: `1px solid ${COLORS.border}`, borderRadius: 999, padding: '5px 0', cursor: 'pointer' }}
              >
                <RefreshCw size={12} /> 색상 변경
              </button>
            )}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600, marginBottom: 6 }}>제목</div>
              <input
                value={title}
                onChange={(e) => { setTitle(e.target.value); if (e.target.value.trim()) setTitleError(false); }}
                placeholder="책 제목을 입력하세요"
                style={{ ...inputStyle, borderColor: titleError ? COLORS.danger : COLORS.border }}
              />
              {titleError && <div style={{ fontSize: 11, color: COLORS.danger, marginTop: 4 }}>제목을 입력해주세요</div>}
            </div>
            <button
              onClick={() => setIsFavoriteBook(!isFavoriteBook)}
              style={{
                marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
                padding: '7px 12px', borderRadius: 999, cursor: 'pointer',
                background: isFavoriteBook ? COLORS.primary : 'transparent',
                color: isFavoriteBook ? '#fff' : COLORS.textMuted,
                border: isFavoriteBook ? 'none' : `1px solid ${COLORS.border}`,
              }}
            >
              <Heart size={14} fill={isFavoriteBook ? '#fff' : 'none'} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>인생책으로 지정</span>
            </button>
          </div>
        </div>

        <Field label="표지 이미지 주소 (URL, 선택사항)">
          <input
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://... (비워두면 색상 표지를 사용해요)"
            style={inputStyle}
          />
        </Field>

        <Field label="ISBN (선택사항)">
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="바코드 스캔 시 자동으로 채워져요"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={() => lookupIsbn(isbn)}
              disabled={lookupStatus === 'loading'}
              style={{ padding: '0 16px', background: COLORS.primary, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {lookupStatus === 'loading' ? '조회 중...' : '조회'}
            </button>
          </div>
          {lookupStatus === 'success' && (
            <div style={{ fontSize: 11, color: COLORS.primary, marginTop: 4, lineHeight: 1.5 }}>
              도서 정보를 찾아 자동으로 채워졌어요. 확인 후 필요하면 수정해주세요.
            </div>
          )}
          {lookupStatus === 'notfound' && (
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4, lineHeight: 1.5 }}>
              일치하는 도서 정보를 찾지 못했어요. 직접 입력해주세요.
            </div>
          )}
          {lookupStatus === 'error' && (
            <div style={{ fontSize: 11, color: COLORS.danger, marginTop: 4, lineHeight: 1.5 }}>
              지금은 자동 조회를 할 수 없어요. 직접 입력해주세요.
            </div>
          )}
        </Field>

        <Field label="저자">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="저자명" style={inputStyle} />
        </Field>
        <Field label="역자 (선택)">
          <input value={translator} onChange={(e) => setTranslator(e.target.value)} placeholder="역자명" style={inputStyle} />
        </Field>
        <Field label="출판사">
          <input value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="출판사명" style={inputStyle} />
        </Field>
        <Field label="출판년도">
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="예: 2024" style={inputStyle} />
        </Field>
        <Field label="장르">
          <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>

        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600, marginBottom: 8 }}>책 상태</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {statuses.map((s) => (
              <button
                key={s.key}
                onClick={() => setStatus(s.key)}
                style={{
                  fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                  background: status === s.key ? COLORS.primary : 'transparent',
                  color: status === s.key ? '#fff' : COLORS.textMuted,
                  border: status === s.key ? 'none' : `1px solid ${COLORS.border}`,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20, padding: 14, background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}` }}>
          {status === 'wishlist' && (
            <div style={{ fontSize: 12, color: COLORS.textMuted, textAlign: 'center', padding: '8px 0' }}>
              아직 읽기 전이라 추가 입력이 필요 없어요.
            </div>
          )}

          {status === 'reading' && (
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <Field label="현재 읽은 페이지">
                  <input type="number" value={currentPage} onChange={(e) => setCurrentPage(e.target.value)} placeholder="0" style={inputStyle} />
                </Field>
              </div>
              <div style={{ flex: 1 }}>
                <Field label="전체 페이지 수">
                  <input type="number" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} placeholder="0" style={inputStyle} />
                </Field>
              </div>
            </div>
          )}

          {status === 'completed' && (
            <>
              <Field label="전체 페이지 수">
                <input type="number" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} placeholder="0" style={inputStyle} />
              </Field>
              <Field label="완독일">
                <input type="date" value={completedDate} onChange={(e) => setCompletedDate(e.target.value)} style={inputStyle} />
              </Field>
              <div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600, marginBottom: 6 }}>나에게 남은 한 줄</div>
                <textarea
                  value={completionOneLine}
                  onChange={(e) => setCompletionOneLine(e.target.value)}
                  rows={2}
                  placeholder="이 책이 나에게 남긴 한 줄을 적어보세요"
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
            </>
          )}

          {status === 'paused' && (
            <>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <Field label="현재 읽은 페이지">
                    <input type="number" value={currentPage} onChange={(e) => setCurrentPage(e.target.value)} placeholder="0" style={inputStyle} />
                  </Field>
                </div>
                <div style={{ flex: 1 }}>
                  <Field label="전체 페이지 수">
                    <input type="number" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} placeholder="0" style={inputStyle} />
                  </Field>
                </div>
              </div>
              <Field label="중단일">
                <input type="date" value={stoppedDate} onChange={(e) => setStoppedDate(e.target.value)} style={inputStyle} />
              </Field>
              <div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600, marginBottom: 6 }}>중단한 이유</div>
                <textarea
                  value={stoppedReason}
                  onChange={(e) => setStoppedReason(e.target.value)}
                  rows={2}
                  placeholder="왜 읽기를 멈췄는지 짧게 적어보세요"
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleSave}
          style={{ width: '100%', marginTop: 24, padding: '14px 0', background: COLORS.primary, color: '#fff', border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
        >
          저장하기
        </button>
      </div>
    </>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [screen, setScreen] = useState('home');
  const [selected, setSelected] = useState(null);
  const [recordCtx, setRecordCtx] = useState(null);
  const [toast, setToast] = useState('');
  const [scannedIsbn, setScannedIsbn] = useState('');
  const [books, setBooks] = useState({
    reading: initialReading,
    completed: initialCompleted,
    paused: initialPaused,
    wishlist: initialWishlist,
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1800);
  };

  const handleSelectBook = (book, status) => {
    setSelected({ book, status });
    setScreen('detail');
  };

  const handleBack = () => {
    setScreen('home');
    setSelected(null);
  };

  const handleAddBook = () => setScreen('addChoice');
  const handleGoScan = () => setScreen('scan');
  const handleGoManualForm = () => {
    setScannedIsbn('');
    setScreen('form');
  };
  const handleBarcodeDetected = (code) => {
    setScannedIsbn(code);
    showToast(`바코드 인식 완료: ${code}`);
    setScreen('form');
  };

  const handleOpenRecord = (round, mode) => {
    setRecordCtx({ bookId: selected.book.id, status: selected.status, round, mode: mode || 'edit' });
    setScreen('record');
  };

  const handleBackFromRecord = () => {
    setScreen('detail');
    setRecordCtx(null);
  };

  const updateRoundBlocks = (bookId, status, round, blocks) => {
    setBooks((prev) => {
      const list = prev[status].map((b) => {
        if (b.id !== bookId) return b;
        const current = b.records[round];
        const nextStatus = current.status === 'empty' ? 'active' : current.status;
        return { ...b, records: { ...b.records, [round]: { ...current, status: nextStatus, blocks } } };
      });
      return { ...prev, [status]: list };
    });
    if (selected && selected.book.id === bookId) {
      setSelected((s) => {
        const current = s.book.records[round];
        const nextStatus = current.status === 'empty' ? 'active' : current.status;
        return { ...s, book: { ...s.book, records: { ...s.book.records, [round]: { ...current, status: nextStatus, blocks } } } };
      });
    }
  };

  const completeRound = (bookId, status, round) => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const defaultQuestions = [
      { id: 'q1', text: '이 책을 통해 새롭게 바라보게 된 가치관은 무엇인가요?', answer: '' },
      { id: 'q2', text: '이 책의 상황을 나라면 어떻게 다르게 겪었을까요?', answer: '' },
      { id: 'q3', text: '이 책이 지금의 나에게 던지고자 하는 메시지는 무엇일까요?', answer: '' },
    ];
    setBooks((prev) => {
      const list = prev[status].map((b) => {
        if (b.id !== bookId) return b;
        const current = b.records[round];
        return { ...b, records: { ...b.records, [round]: { ...current, status: 'completed', completedDate: dateStr, questions: current.questions.length ? current.questions : defaultQuestions } } };
      });
      return { ...prev, [status]: list };
    });
    setSelected((s) => {
      if (!s || s.book.id !== bookId) return s;
      const current = s.book.records[round];
      return { ...s, book: { ...s.book, records: { ...s.book.records, [round]: { ...current, status: 'completed', completedDate: dateStr, questions: current.questions.length ? current.questions : defaultQuestions } } } };
    });
  };

  const handleCompleteRound = (round) => {
    completeRound(recordCtx.bookId, recordCtx.status, round);
    setScreen('aiQuestions');
  };

  const handleGoToQuestions = (round) => {
    setScreen('aiQuestions');
  };

  const handleCloseQuestions = () => {
    setRecordCtx((ctx) => ({ ...ctx, mode: 'read' }));
    setScreen('record');
  };

  const updateQuestionAnswer = (bookId, status, round, questionId, answer) => {
    setBooks((prev) => {
      const list = prev[status].map((b) => {
        if (b.id !== bookId) return b;
        const current = b.records[round];
        const questions = current.questions.map((q) => (q.id === questionId ? { ...q, answer } : q));
        return { ...b, records: { ...b.records, [round]: { ...current, questions } } };
      });
      return { ...prev, [status]: list };
    });
    setSelected((s) => {
      if (!s || s.book.id !== bookId) return s;
      const current = s.book.records[round];
      const questions = current.questions.map((q) => (q.id === questionId ? { ...q, answer } : q));
      return { ...s, book: { ...s.book, records: { ...s.book.records, [round]: { ...current, questions } } } };
    });
  };

  const handleSaveBook = (data) => {
    const id = Date.now();
    const base = {
      id,
      title: data.title,
      author: data.author,
      translator: data.translator,
      publisher: data.publisher,
      year: data.year,
      genre: data.genre,
      palette: data.palette,
      coverImageUrl: data.coverImageUrl,
      isFavoriteBook: data.isFavoriteBook,
      records: { 1: emptyRound(), 2: emptyRound(), 3: emptyRound() },
    };

    let bucket = data.status;
    let entry;

    if (data.status === 'wishlist') {
      entry = { ...base, source: '직접 추가' };
    } else if (data.status === 'reading') {
      const progress = data.totalPages > 0 ? Math.min(100, Math.round((data.currentPage / data.totalPages) * 100)) : 0;
      entry = { ...base, progress, totalPages: data.totalPages, currentPage: data.currentPage, note: '' };
    } else if (data.status === 'completed') {
      entry = { ...base, date: data.completedDate || '', note: data.completionOneLine, totalPages: data.totalPages, currentPage: data.totalPages };
    } else if (data.status === 'paused') {
      const progress = data.totalPages > 0 ? Math.min(100, Math.round((data.currentPage / data.totalPages) * 100)) : 0;
      entry = { ...base, progress, totalPages: data.totalPages, currentPage: data.currentPage, pausedDate: data.stoppedDate || '', stoppedReason: data.stoppedReason };
    }

    setBooks((prev) => ({ ...prev, [bucket]: [entry, ...prev[bucket]] }));
    setScreen('home');
    showToast(`"${data.title}" 이(가) ${STATUS_LABEL[bucket]} 목록에 저장됐어요`);
  };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: FONT_STACK, minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 384, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', background: COLORS.bg }}>
        {screen === 'home' && (
          <HomeScreen books={books} onSelectBook={handleSelectBook} onAddBook={handleAddBook} showToast={showToast} />
        )}
        {screen === 'detail' && selected && (
          <BookDetailScreen book={selected.book} status={selected.status} onBack={handleBack} onOpenRecord={handleOpenRecord} showToast={showToast} />
        )}
        {screen === 'record' && recordCtx && selected && (
          <RecordScreen
            book={selected.book}
            round={recordCtx.round}
            roundData={selected.book.records[recordCtx.round]}
            mode={recordCtx.mode}
            onBack={handleBackFromRecord}
            onUpdateBlocks={(round, blocks) => updateRoundBlocks(recordCtx.bookId, recordCtx.status, round, blocks)}
            onComplete={handleCompleteRound}
            onGoToQuestions={handleGoToQuestions}
            showToast={showToast}
          />
        )}
        {screen === 'aiQuestions' && recordCtx && selected && (
          <AIQuestionScreen
            book={selected.book}
            round={recordCtx.round}
            roundData={selected.book.records[recordCtx.round]}
            onUpdateAnswer={(round, questionId, answer) => updateQuestionAnswer(recordCtx.bookId, recordCtx.status, round, questionId, answer)}
            onClose={handleCloseQuestions}
          />
        )}
        {screen === 'form' && (
          <BookFormScreen onCancel={handleBack} onSave={handleSaveBook} showToast={showToast} initialIsbn={scannedIsbn} />
        )}
        {screen === 'addChoice' && (
          <AddChoiceScreen onScan={handleGoScan} onManual={handleGoManualForm} onCancel={handleBack} />
        )}
        {screen === 'scan' && (
          <ScanScreen onDetected={handleBarcodeDetected} onCancel={() => setScreen('addChoice')} showToast={showToast} />
        )}
        <Toast message={toast} />
      </div>
    </div>
  );
}
