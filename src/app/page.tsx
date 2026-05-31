"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, type PanInfo } from "framer-motion";
import {
  Bell,
  Eye,
  Home as HomeIcon,
  LogOut,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
} from "lucide-react";

type FontKey = "clean" | "serif" | "mono" | "bold" | "narrow";

type Section = {
  id: string;
  name: string;
  color: string;
  isPublic: boolean;
};

type Bucket = {
  id: string;
  sectionId: string;
  title: string;
  x: number;
  y: number;
  done: boolean;
  color: string;
  fontSize: number;
  fontWeight: number;
  font: FontKey;
  rotate: number;
};

const fontMap: Record<FontKey, string> = {
  clean:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif',
  serif: 'Georgia, "Times New Roman", "Noto Serif KR", serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  bold: 'Arial Black, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif',
  narrow:
    'Arial Narrow, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif',
};

const fontLabel: Record<FontKey, string> = {
  clean: "Clean",
  serif: "Serif",
  mono: "Mono",
  bold: "Bold",
  narrow: "Narrow",
};

const palette = [
  "#111827",
  "#2563eb",
  "#0f9f75",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#6b7280",
  "#0f766e",
];

const initialSections: Section[] = [
  { id: "life", name: "Life", color: "#2563eb", isPublic: true },
  { id: "2025", name: "2025", color: "#10b981", isPublic: true },
  { id: "2026", name: "2026", color: "#f59e0b", isPublic: false },
  { id: "travel", name: "Travel", color: "#8b5cf6", isPublic: true },
  { id: "health", name: "Health", color: "#ef4444", isPublic: false },
];

const initialBuckets: Bucket[] = [
  {
    id: "b1",
    sectionId: "life",
    title: "매일 30분 운동하기",
    x: 88,
    y: 84,
    done: false,
    color: "#111827",
    fontSize: 31,
    fontWeight: 390,
    font: "clean",
    rotate: -2,
  },
  {
    id: "b2",
    sectionId: "2025",
    title: "책 12권 읽기",
    x: 450,
    y: 82,
    done: false,
    color: "#0f9f75",
    fontSize: 30,
    fontWeight: 460,
    font: "narrow",
    rotate: 1,
  },
  {
    id: "b3",
    sectionId: "travel",
    title: "유럽 여행 가기",
    x: 765,
    y: 72,
    done: false,
    color: "#2563eb",
    fontSize: 42,
    fontWeight: 300,
    font: "clean",
    rotate: 1,
  },
  {
    id: "b4",
    sectionId: "health",
    title: "프론트엔드 마스터 되기",
    x: 96,
    y: 214,
    done: false,
    color: "#ef4444",
    fontSize: 30,
    fontWeight: 300,
    font: "mono",
    rotate: -1,
  },
  {
    id: "b5",
    sectionId: "travel",
    title: "제주도 한 달 살기",
    x: 450,
    y: 220,
    done: false,
    color: "#222222",
    fontSize: 28,
    fontWeight: 300,
    font: "serif",
    rotate: -1,
  },
  {
    id: "b6",
    sectionId: "life",
    title: "부모님께\n효도 여행 선물하기",
    x: 820,
    y: 205,
    done: false,
    color: "#111827",
    fontSize: 25,
    fontWeight: 700,
    font: "clean",
    rotate: 0,
  },
  {
    id: "b7",
    sectionId: "2026",
    title: "일본에서 한 달 살기",
    x: 84,
    y: 338,
    done: false,
    color: "#e5a500",
    fontSize: 28,
    fontWeight: 360,
    font: "clean",
    rotate: 0,
  },
  {
    id: "b8",
    sectionId: "life",
    title: "나만의 브랜드 만들기",
    x: 365,
    y: 352,
    done: false,
    color: "#111827",
    fontSize: 34,
    fontWeight: 650,
    font: "clean",
    rotate: -1,
  },
  {
    id: "b9",
    sectionId: "travel",
    title: "피아노 배우기",
    x: 760,
    y: 350,
    done: false,
    color: "#8b5cf6",
    fontSize: 31,
    fontWeight: 300,
    font: "clean",
    rotate: 1,
  },
  {
    id: "b10",
    sectionId: "life",
    title: "매일 감사일기 쓰기",
    x: 90,
    y: 478,
    done: false,
    color: "#4b5563",
    fontSize: 24,
    fontWeight: 330,
    font: "narrow",
    rotate: 0,
  },
  {
    id: "b11",
    sectionId: "health",
    title: "러닝 10km 완주하기",
    x: 450,
    y: 470,
    done: false,
    color: "#0f7ac9",
    fontSize: 29,
    fontWeight: 420,
    font: "clean",
    rotate: 1,
  },
  {
    id: "b12",
    sectionId: "2025",
    title: "영어 회화 마스터하기",
    x: 790,
    y: 470,
    done: false,
    color: "#059669",
    fontSize: 24,
    fontWeight: 430,
    font: "clean",
    rotate: -1,
  },
  {
    id: "b13",
    sectionId: "2025",
    title: "블로그 꾸준히 운영하기",
    x: 55,
    y: 720,
    done: true,
    color: "#6b7280",
    fontSize: 20,
    fontWeight: 400,
    font: "clean",
    rotate: 0,
  },
  {
    id: "b14",
    sectionId: "life",
    title: "아침 7시 기상 습관 만들기",
    x: 320,
    y: 720,
    done: true,
    color: "#6b7280",
    fontSize: 20,
    fontWeight: 400,
    font: "clean",
    rotate: 0,
  },
  {
    id: "b15",
    sectionId: "travel",
    title: "발리 여행 다녀오기",
    x: 610,
    y: 720,
    done: true,
    color: "#6b7280",
    fontSize: 30,
    fontWeight: 300,
    font: "serif",
    rotate: 0,
  },
];

const storageKey = "bucket-cloud-clean-prototype";

export default function Home() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [nickname, setNickname] = useState("초희");
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [buckets, setBuckets] = useState<Bucket[]>(initialBuckets);
  const [activeSection, setActiveSection] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>("b3");
  const [newBucket, setNewBucket] = useState("");
  const [newSection, setNewSection] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        nickname?: string;
        sections?: Section[];
        buckets?: Bucket[];
      };
      setNickname(parsed.nickname ?? "초희");
      setSections(parsed.sections ?? initialSections);
      setBuckets(parsed.buckets ?? initialBuckets);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ nickname, sections, buckets }),
    );
  }, [nickname, sections, buckets]);

  const filteredBuckets = useMemo(() => {
    if (activeSection === "all") return buckets;
    return buckets.filter((bucket) => bucket.sectionId === activeSection);
  }, [activeSection, buckets]);

  const activeBuckets = filteredBuckets.filter((bucket) => !bucket.done);
  const doneBuckets = filteredBuckets.filter((bucket) => bucket.done);
  const selectedBucket = buckets.find((bucket) => bucket.id === selectedId);

  const addSection = () => {
    const name = newSection.trim();
    if (!name) return;

    const section: Section = {
      id: crypto.randomUUID(),
      name,
      color: palette[(sections.length + 1) % palette.length],
      isPublic: false,
    };

    setSections((prev) => [...prev, section]);
    setActiveSection(section.id);
    setNewSection("");
  };

  const addBucket = () => {
    const title = newBucket.trim();
    if (!title) return;

    const fontOptions: FontKey[] = ["clean", "serif", "mono", "bold", "narrow"];
    const sectionId =
      activeSection === "all" ? (sections[0]?.id ?? "life") : activeSection;
    const item: Bucket = {
      id: crypto.randomUUID(),
      sectionId,
      title,
      x: 110 + Math.random() * 700,
      y: 90 + Math.random() * 360,
      done: false,
      color: palette[Math.floor(Math.random() * palette.length)],
      fontSize: 24 + Math.floor(Math.random() * 14),
      fontWeight: [300, 400, 500, 650][Math.floor(Math.random() * 4)],
      font: fontOptions[Math.floor(Math.random() * fontOptions.length)],
      rotate: -2 + Math.random() * 4,
    };

    setBuckets((prev) => [...prev, item]);
    setSelectedId(item.id);
    setNewBucket("");
  };

  const updateBucket = (id: string, patch: Partial<Bucket>) => {
    setBuckets((prev) =>
      prev.map((bucket) =>
        bucket.id === id ? { ...bucket, ...patch } : bucket,
      ),
    );
  };

  const updateSection = (id: string, patch: Partial<Section>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, ...patch } : section,
      ),
    );
  };

  const deleteBucket = (id: string) => {
    setBuckets((prev) => prev.filter((bucket) => bucket.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const toggleDone = (bucket: Bucket) => {
    updateBucket(bucket.id, {
      done: !bucket.done,
      y: bucket.done ? 360 : 720,
    });
  };

  const handleDragEnd = (bucket: Bucket, info: PanInfo) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const nextX = Math.min(
      Math.max(bucket.x + info.offset.x, 8),
      rect.width - 80,
    );
    const nextY = Math.min(
      Math.max(bucket.y + info.offset.y, 8),
      rect.height - 220,
    );
    updateBucket(bucket.id, { x: nextX, y: nextY });
  };

  const activeSectionData = sections.find(
    (section) => section.id === activeSection,
  );

  return (
    <main className="appShell">
      <aside className="sidebar">
        <div className="logo">
          Bucket
          <br />
          Cloud<span className="logoDot">.</span>
        </div>

        <button
          className="primaryButton"
          onClick={() => document.getElementById("bucket-input")?.focus()}
        >
          <Plus size={18} /> 버킷 추가
        </button>

        <nav className="sideNav">
          <SideItem
            active
            icon={<HomeIcon size={18} />}
            label="라이프 캔버스"
          />
          <SideItem icon={<Search size={18} />} label="탐색" />
          <SideItem icon={<Eye size={18} />} label="구경하기" />
          <SideItem icon={<User size={18} />} label="내 프로필" />
          <SideItem icon={<Settings size={18} />} label="설정" />
        </nav>

        <div className="divider" />

        <div className="sidebarHeader">
          <span>내 섹션</span>
          <button
            className="iconButton"
            onClick={addSection}
            aria-label="섹션 추가"
          >
            <Plus size={18} />
          </button>
        </div>

        <input
          className="sectionInput"
          value={newSection}
          onChange={(event) => setNewSection(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addSection();
          }}
          placeholder="Life, 2026처럼 입력"
        />

        <div className="sectionList">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`sectionButton ${activeSection === section.id ? "sectionButtonActive" : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="sectionName">
                <span
                  className="sectionDot"
                  style={{ backgroundColor: section.color }}
                />
                {section.name}
              </span>
              <span className="sectionCount">
                {
                  buckets.filter((bucket) => bucket.sectionId === section.id)
                    .length
                }
              </span>
            </button>
          ))}
        </div>

        {activeSectionData && (
          <label className="publicToggle">
            <input
              type="checkbox"
              checked={activeSectionData.isPublic}
              onChange={(event) =>
                updateSection(activeSectionData.id, {
                  isPublic: event.target.checked,
                })
              }
            />
            현재 섹션 공개
          </label>
        )}

        <div className="divider" />

        <button className="sideItem">
          <LogOut size={17} />
          로그아웃
        </button>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <p className="greeting">안녕하세요, {nickname}님</p>
            <p className="subGreeting">
              글씨 자체를 자유롭게 띄우고 꾸미는 버킷 캔버스
            </p>
          </div>

          <div className="topActions">
            <label className="searchBox">
              <Search size={17} />
              <input placeholder="닉네임으로 구경하기" />
            </label>
            <Bell size={20} color="#667085" />
            <div className="avatar">{nickname.slice(0, 2).toUpperCase()}</div>
          </div>
        </header>

        <div className="tabRow">
          <button
            className={`tabButton ${activeSection === "all" ? "tabButtonActive" : ""}`}
            onClick={() => setActiveSection("all")}
          >
            전체
          </button>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`tabButton ${activeSection === section.id ? "tabButtonActive" : ""}`}
              style={
                activeSection === section.id
                  ? { borderBottomColor: section.color, color: section.color }
                  : undefined
              }
              onClick={() => setActiveSection(section.id)}
            >
              {section.name}
            </button>
          ))}
          <button
            className="iconButton"
            onClick={() =>
              document.querySelector<HTMLInputElement>(".sectionInput")?.focus()
            }
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="addRow">
          <input
            id="bucket-input"
            className="bucketInput"
            value={newBucket}
            onChange={(event) => setNewBucket(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addBucket();
            }}
            placeholder="새 버킷을 입력하고 Enter"
          />
          <button className="darkButton" onClick={addBucket}>
            추가
          </button>
        </div>

        <div className="canvasWrap" ref={canvasRef}>
          <div className="canvasHint">
            Double click to complete · Drag to move
          </div>

          <div className="toolPanel" aria-label="편집 도구">
            <button className="toolButton">↖</button>
            <button className="toolButton">T</button>
            <button className="toolButton">○</button>
            <button className="toolButton">□</button>
          </div>

          {activeBuckets.map((bucket, index) => (
            <motion.div
              key={bucket.id}
              className={`floatingItem ${selectedId === bucket.id ? "selectedItem" : ""}`}
              style={{ left: bucket.x, top: bucket.y }}
              drag
              dragMomentum={false}
              onDragStart={() => setSelectedId(bucket.id)}
              onDragEnd={(_, info) => handleDragEnd(bucket, info)}
              onClick={() => setSelectedId(bucket.id)}
              onDoubleClick={() => toggleDone(bucket)}
            >
              <motion.span
                className="floatingText"
                animate={{
                  y: [0, -7, 0, 5, 0],
                  rotate: [
                    bucket.rotate,
                    bucket.rotate + (index % 2 === 0 ? -0.7 : 0.7),
                    bucket.rotate,
                  ],
                }}
                transition={{
                  duration: 5.2 + index * 0.22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  color: bucket.color,
                  fontFamily: fontMap[bucket.font],
                  fontSize: bucket.fontSize,
                  fontWeight: bucket.fontWeight,
                  whiteSpace: "pre-line",
                }}
              >
                {bucket.title}
              </motion.span>
            </motion.div>
          ))}

          <section className="doneShelf">
            <div className="doneHeader">
              <span>↓</span>
              <span>완료한 버킷</span>
              <span className="doneCount">{doneBuckets.length}</span>
            </div>

            <div className="doneList">
              {doneBuckets.map((bucket) => (
                <motion.button
                  key={bucket.id}
                  className="doneText"
                  layout
                  initial={{ y: -90, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.58 }}
                  onClick={() => setSelectedId(bucket.id)}
                  onDoubleClick={() => toggleDone(bucket)}
                  style={{
                    color: bucket.color,
                    fontFamily: fontMap[bucket.font],
                    fontSize: Math.max(bucket.fontSize - 7, 16),
                    fontWeight: bucket.fontWeight,
                    whiteSpace: "pre-line",
                  }}
                >
                  {bucket.title}
                </motion.button>
              ))}
            </div>
          </section>
        </div>

        {selectedBucket && (
          <section className="editor">
            <div className="editorGrid">
              <input
                className="editTitle"
                value={selectedBucket.title}
                onChange={(event) =>
                  updateBucket(selectedBucket.id, { title: event.target.value })
                }
              />

              <select
                className="select"
                value={selectedBucket.font}
                onChange={(event) =>
                  updateBucket(selectedBucket.id, {
                    font: event.target.value as FontKey,
                  })
                }
              >
                {(Object.keys(fontMap) as FontKey[]).map((font) => (
                  <option key={font} value={font}>
                    {fontLabel[font]}
                  </option>
                ))}
              </select>

              <label className="rangeLabel">
                크기
                <input
                  type="range"
                  min={16}
                  max={58}
                  value={selectedBucket.fontSize}
                  onChange={(event) =>
                    updateBucket(selectedBucket.id, {
                      fontSize: Number(event.target.value),
                    })
                  }
                />
              </label>

              <label className="rangeLabel">
                굵기
                <input
                  type="range"
                  min={300}
                  max={900}
                  step={100}
                  value={selectedBucket.fontWeight}
                  onChange={(event) =>
                    updateBucket(selectedBucket.id, {
                      fontWeight: Number(event.target.value),
                    })
                  }
                />
              </label>

              <div className="colorDots">
                {palette.map((color) => (
                  <button
                    key={color}
                    className="colorDot"
                    style={{ backgroundColor: color }}
                    onClick={() => updateBucket(selectedBucket.id, { color })}
                    aria-label={`${color} 색상`}
                  />
                ))}
              </div>

              <button
                className="smallButton"
                onClick={() => toggleDone(selectedBucket)}
              >
                {selectedBucket.done ? "다시 띄우기" : "완료"}
              </button>

              <button
                className="trashButton"
                onClick={() => deleteBucket(selectedBucket.id)}
                aria-label="삭제"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function SideItem({
  icon,
  label,
  active = false,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button className={`sideItem ${active ? "sideItemActive" : ""}`}>
      {icon}
      {label}
    </button>
  );
}
