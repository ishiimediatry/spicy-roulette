"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ChefHat,
  Plus,
  RotateCw,
  Sparkles,
  Trash2,
} from "lucide-react";

type Analysis = {
  spread: number;
  heat: number;
  acid: number;
  danger: number;
};

type Recipe = {
  name: string;
  ingredients: string[];
  aliases: string[];
  pepper: string;
  structure: string[];
  analysis: Analysis;
  time: string;
};

const HOT_INGREDIENTS = [
  {
    name: "Pepper X",
    shu: "約269万SHU",
    effect: "脂溶性拡散型",
    description: "油に溶けた辛味が料理全体へ広がり、口内の接触範囲を最大化する。",
  },
  {
    name: "キャロライナ・リーパー",
    shu: "約220万SHU級",
    effect: "酸性刺激型",
    description: "酸味と組み合わせることで、辛味がより鋭い痛覚刺激として感じられる。",
  },
  {
    name: "トリニダード・モルガ・スコーピオン",
    shu: "約200万SHU級",
    effect: "遅効侵食型",
    description: "食べ始めよりも後から強く感じる、時間差型の辛味演出に向く。",
  },
  {
    name: "ブート・ジョロキア",
    shu: "約100万SHU級",
    effect: "蓄熱定着型",
    description: "とろみや煮込み構造と相性がよく、辛味を長く残す演出に向く。",
  },
  {
    name: "コモドドラゴン",
    shu: "250万SHU級",
    effect: "熱暴走型",
    description: "高温状態と組み合わせることで、熱さと辛さを同時に感じさせる架空級の激辛食材。",
  },
];

const RECIPES: Recipe[] = [
  {
    name: "マグマ酸熱カレー",
    ingredients: ["玉ねぎ", "トマト", "牛肉"],
    aliases: ["人参", "じゃがいも", "肉"],
    pepper: "Pepper X",
    structure: ["脂溶性拡散", "とろみ蓄熱", "酸性刺激"],
    analysis: { spread: 5, heat: 5, acid: 4, danger: 98 },
    time: "約40分",
  },
  {
    name: "灼熱トマト麻婆",
    ingredients: ["ひき肉", "トマト", "ねぎ"],
    aliases: ["ミンチ", "豆腐"],
    pepper: "キャロライナ・リーパー",
    structure: ["酸性刺激", "油膜拡散", "蒸気攻撃"],
    analysis: { spread: 5, heat: 4, acid: 5, danger: 99 },
    time: "約20分",
  },
  {
    name: "業火あんかけ焼きそば",
    ingredients: ["豚肉", "キャベツ"],
    aliases: ["もやし", "人参"],
    pepper: "コモドドラゴン",
    structure: ["蒸気拡散", "とろみ蓄熱", "酸性刺激"],
    analysis: { spread: 4, heat: 5, acid: 5, danger: 97 },
    time: "約25分",
  },
  {
    name: "酸熱デスパスタ",
    ingredients: ["トマト", "にんにく"],
    aliases: ["玉ねぎ"],
    pepper: "トリニダード・モルガ・スコーピオン",
    structure: ["脂溶性拡散", "酸性刺激", "遅効侵食"],
    analysis: { spread: 5, heat: 3, acid: 5, danger: 96 },
    time: "約20分",
  },
  {
    name: "爆炎マグマ丼",
    ingredients: ["鶏肉", "卵", "玉ねぎ", "トマト"],
    aliases: ["ねぎ"],
    pepper: "ブート・ジョロキア",
    structure: ["とろみ蓄熱", "酸性刺激", "遅効侵食"],
    analysis: { spread: 4, heat: 5, acid: 4, danger: 95 },
    time: "約25分",
  },
  {
    name: "地獄の酸辣スープ",
    ingredients: ["卵", "きのこ", "ねぎ"],
    aliases: ["たけのこ"],
    pepper: "Pepper X",
    structure: ["蒸気攻撃", "酸性刺激", "とろみ蓄熱"],
    analysis: { spread: 5, heat: 5, acid: 5, danger: 100 },
    time: "約20分",
  },
  {
    name: "灼熱酸味酢豚",
    ingredients: ["豚肉", "玉ねぎ", "トマト"],
    aliases: ["ピーマン"],
    pepper: "キャロライナ・リーパー",
    structure: ["酸性刺激", "とろみ蓄熱", "油膜拡散"],
    analysis: { spread: 4, heat: 4, acid: 5, danger: 94 },
    time: "約30分",
  },
  {
    name: "爆炎酸辣チャーハン",
    ingredients: ["卵", "ねぎ"],
    aliases: ["チャーシュー"],
    pepper: "Pepper X",
    structure: ["油膜拡散", "酸性刺激", "蒸気攻撃"],
    analysis: { spread: 5, heat: 4, acid: 4, danger: 96 },
    time: "約15分",
  },
  {
    name: "酸熱マグマうどん",
    ingredients: ["トマト", "ひき肉"],
    aliases: ["ねぎ"],
    pepper: "ブート・ジョロキア",
    structure: ["とろみ蓄熱", "酸性刺激", "遅効侵食"],
    analysis: { spread: 4, heat: 5, acid: 5, danger: 97 },
    time: "約20分",
  },
  {
    name: "火炎デス餃子",
    ingredients: ["ひき肉", "キャベツ"],
    aliases: ["ニラ"],
    pepper: "トリニダード・モルガ・スコーピオン",
    structure: ["遅効侵食", "油膜拡散", "蓄熱"],
    analysis: { spread: 5, heat: 4, acid: 2, danger: 93 },
    time: "約35分",
  },
  {
    name: "灼熱酸味ラーメン",
    ingredients: ["チャーシュー", "ねぎ"],
    aliases: ["もやし"],
    pepper: "コモドドラゴン",
    structure: ["蒸気攻撃", "酸性刺激", "油膜拡散"],
    analysis: { spread: 5, heat: 5, acid: 4, danger: 98 },
    time: "約25分",
  },
  {
    name: "マグマ天津飯",
    ingredients: ["卵", "ねぎ"],
    aliases: ["カニカマ"],
    pepper: "Pepper X",
    structure: ["とろみ蓄熱", "酸性刺激", "蒸気攻撃"],
    analysis: { spread: 5, heat: 5, acid: 4, danger: 97 },
    time: "約20分",
  },
  {
    name: "業火トマト煮込み",
    ingredients: ["鶏肉", "トマト", "玉ねぎ"],
    aliases: ["にんにく"],
    pepper: "キャロライナ・リーパー",
    structure: ["酸性刺激", "油膜拡散", "蓄熱"],
    analysis: { spread: 4, heat: 4, acid: 5, danger: 95 },
    time: "約35分",
  },
  {
    name: "爆炎石焼きビビンバ",
    ingredients: ["ひき肉", "卵", "もやし"],
    aliases: ["ほうれん草"],
    pepper: "トリニダード・モルガ・スコーピオン",
    structure: ["蓄熱", "油膜拡散", "遅効侵食"],
    analysis: { spread: 5, heat: 5, acid: 2, danger: 96 },
    time: "約25分",
  },
  {
    name: "地獄の酸熱春巻き",
    ingredients: ["ひき肉"],
    aliases: ["キャベツ", "たけのこ"],
    pepper: "ブート・ジョロキア",
    structure: ["内部灼熱", "酸性刺激", "遅効侵食"],
    analysis: { spread: 4, heat: 5, acid: 4, danger: 95 },
    time: "約30分",
  },
  {
    name: "灼熱デストマト鍋",
    ingredients: ["トマト", "キャベツ", "鶏肉", "きのこ"],
    aliases: ["ソーセージ"],
    pepper: "コモドドラゴン",
    structure: ["蒸気攻撃", "酸性刺激", "とろみ蓄熱"],
    analysis: { spread: 5, heat: 5, acid: 5, danger: 100 },
    time: "約40分",
  },
];

function normalize(text: string) {
  return String(text).trim().toLowerCase().replace(/\s/g, "");
}

function hasAllRequiredIngredients(recipe: Recipe, pantry: string[]) {
  const normalizedPantry = pantry.map(normalize);

  return recipe.ingredients.every((ingredient) => {
    const target = normalize(ingredient);
    return normalizedPantry.some(
      (item) => item.includes(target) || target.includes(item)
    );
  });
}

function getPepperInfo(name: string) {
  return HOT_INGREDIENTS.find((pepper) => pepper.name === name);
}

function getCandidates(pantry: string[]) {
  if (pantry.length === 0) return [];
  return RECIPES.filter((recipe) => hasAllRequiredIngredients(recipe, pantry));
}

function createDetailedSteps(recipe: Recipe) {
  const pepperInfo = getPepperInfo(recipe.pepper);
  const hasAcid = recipe.structure.includes("酸性刺激");
  const hasHeat = recipe.structure.some(
    (item) => item.includes("蓄熱") || item.includes("灼熱")
  );
  const hasSteam = recipe.structure.some((item) => item.includes("蒸気"));
  const hasDelay = recipe.structure.includes("遅効侵食");

  return [
    {
      title: "下準備",
      cook: `${recipe.ingredients.join(
        "、"
      )}を食べやすい大きさに切る。肉や卵がある場合は、火が入りやすいように小さめに整える。`,
      science:
        "食材の表面積を増やすと、油・酸味・辛味が均一に絡みやすくなる。辛味のムラが減り、ひと口ごとの刺激が安定する。",
    },
    {
      title: "激辛食材を油へ移す",
      cook: `${recipe.pepper}を直接入れるのではなく、まず少量の油へなじませる想定で辛味ベースを作る。`,
      science: `カプサイシンは脂溶性なので、水よりも油に広がりやすい。油膜が舌全体へ広がることで、体感上の辛味到達範囲は約2倍から3倍に増える。${
        pepperInfo ? `この料理では${pepperInfo.effect}の性質を使う。` : ""
      }`,
    },
    {
      title: "ベース食材と合わせる",
      cook: "肉や野菜を加えて炒め、辛味油を食材表面へまとわせる。焦がさず、全体に赤い油膜が回る状態を目指す。",
      science:
        "油に溶けた辛味が食材の表面に薄く付着するため、食べた瞬間に舌へ接触する面積が増える。これにより、辛さの立ち上がりが速くなる。",
    },
    {
      title: hasAcid ? "酸味で刺激を鋭くする" : "刺激の輪郭を整える",
      cook: hasAcid
        ? "トマトや酢を加え、酸味が残る程度に加熱する。甘さで丸めすぎず、少し尖った味に仕上げる。"
        : "必要に応じてトマトや香味野菜を加え、辛味だけが単調にならないように味の輪郭を作る。",
      science: hasAcid
        ? "酸味は粘膜への刺激感を強めるため、辛味が『熱い』だけでなく『刺さる』ように感じられる。体感刺激は約1.3倍から1.8倍に上がる想定。"
        : "味の輪郭がはっきりすると辛味の存在感も強く感じられる。単なる辛さではなく、後から追ってくる刺激として認識されやすくなる。",
    },
    {
      title: hasHeat ? "とろみで熱を閉じ込める" : "温度を落とさず仕上げる",
      cook: hasHeat
        ? "煮込み・あん・ルーのような少し重い質感にして、熱が逃げにくい状態を作る。"
        : "仕上げ直前まで温度を高く保ち、食べる瞬間に香りと辛味が立つ状態にする。",
      science: hasHeat
        ? "とろみがある料理は液体より冷めにくく、舌に長く残る。高温と辛味が同時に続くため、辛味持続時間は通常より約1.5倍から2倍に伸びる。"
        : "高温状態では辛味と香りが立ちやすい。温度刺激が加わることで、辛さはより強い痛覚として感じられる。",
    },
    {
      title: hasSteam
        ? "蒸気を立たせる"
        : hasDelay
        ? "遅効性を作る"
        : "口内に定着させる",
      cook: hasSteam
        ? "最後にしっかり温め、湯気が立つ状態で盛り付ける。"
        : hasDelay
        ? "具材の内部や油膜に辛味を閉じ込め、食べた数秒後に辛さが広がるように仕上げる。"
        : "油膜・熱・酸味が残った状態で盛り付け、辛味が口に長く残る構造にする。",
      science: hasSteam
        ? "湯気に乗った刺激が鼻へ抜けることで、舌だけでなく鼻腔にも刺激が入る。辛味体験が口内から呼吸まで広がる。"
        : hasDelay
        ? "油や具材の内部に辛味が残ると、噛んだ後に遅れて広がる。食べ始めよりも後半で辛く感じる構造になる。"
        : "脂溶性の辛味、温度、酸味が同時に残ることで、辛さが一瞬で消えず、余韻として長く続く。",
    },
  ];
}

function Button({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-green-400"
          style={{ width: `${value * 20}%` }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
const [input, setInput] = useState("");
const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

  const [pantry, setPantry] = useState(["卵", "ねぎ", "玉ねぎ", "トマト", "牛肉"]);
  const COMMON_INGREDIENTS = [
  "鶏肉","豚肉","牛肉","ベーコン","ソーセージ",
  "卵","豆腐","チーズ",
  "キャベツ","玉ねぎ","にんじん","じゃがいも",
  "ピーマン","もやし","白菜","大根",
  "トマト","きゅうり","なす","ブロッコリー",
  "きのこ","しめじ","えのき",
  "ご飯","パスタ","うどん"
];
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const candidates = useMemo(() => getCandidates(pantry), [pantry]);
  const selectedSteps = useMemo(
    () => (selected ? createDetailedSteps(selected) : []),
    [selected]
  );
if (isLoading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50">
      <div className="text-center">
        <div className="mb-6 text-8xl">🌶️</div>

        <h1 className="text-3xl font-black text-orange-600">
          スパイシールーレット
        </h1>

        <p className="mt-4 text-gray-600">
          今夜の激辛を選定中...
        </p>

        <div className="mt-6 text-3xl animate-spin">
          🔥
        </div>
      </div>
    </main>
  );
}
  const addIngredient = () => {
    const next = input.trim();
    if (!next) return;
    if (!pantry.includes(next)) setPantry([...pantry, next]);
    setInput("");
  };
const askIngredient = () => {
  const next = window.prompt("追加する食材を入力してください");
  if (!next) return;

  const trimmed = next.trim();
  if (!trimmed) return;

  if (!pantry.includes(trimmed)) {
    setPantry([...pantry, trimmed]);
  }
};
  const removeIngredient = (item: string) => {
    setPantry(pantry.filter((x) => x !== item));
  };

  const spinRoulette = () => {
    if (candidates.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setSpinCount((count) => count + 1);

    setTimeout(() => {
      const pool = candidates.filter((recipe) => recipe.name !== selected?.name);
      const finalPool = pool.length > 0 ? pool : candidates;
      const next = finalPool[Math.floor(Math.random() * finalPool.length)];
      setSelected(next);
      setIsSpinning(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-orange-50 p-4 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600">
              <Sparkles size={18} /> 今夜の激辛ご飯ルーレット
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              冷蔵庫の中身から、今夜の激辛献立を決めよう
            </h1>
            <p className="mt-2 text-slate-600">
              野菜・肉・卵・牛乳など、冷蔵庫にある材料を入力。必要な材料がすべて揃った激辛レシピだけがルーレット候補になります。
            </p>
          </div>
          <ChefHat className="h-16 w-16 text-orange-500" />
        </header>

        <section className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-900">
          <div className="mb-1 flex items-center gap-2 font-black">
            <AlertTriangle size={18} /> 注意
          </div>
          これはアプリ演出用のフィクション寄りレシピです。実際に超高SHU食材を大量に使うと危険なので、現実の調理では安全な量と体調に配慮してください。
        </section>

        <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="space-y-5">
              <h2 className="text-xl font-bold">冷蔵庫リスト</h2>

<div className="flex flex-wrap gap-2">
  {COMMON_INGREDIENTS.map((food) => (
    <button
      key={food}
      type="button"
      onClick={() => {
        if (!pantry.includes(food)) {
          setPantry([...pantry, food]);
        }
      }}
      className="rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-sm"
    >
      {food}
    </button>
  ))}
</div>

              <div className="flex flex-wrap gap-2">
                {pantry.map((item) => (
                  <button
                    key={item}
                    onClick={() => removeIngredient(item)}
                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-100"
                  >
                    {item}
                    <Trash2 size={14} className="text-slate-400" />
                  </button>
                ))}
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                候補メニュー：
                <span className="font-bold text-slate-900">
                  {candidates.length}
                </span>
                件
                {candidates.length === 0 && (
                  <p className="mt-2">
                    必要な冷蔵庫材料がすべて揃ったレシピだけが候補になります。
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{
                  rotate: isSpinning ? 1440 + spinCount * 90 : spinCount * 30,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-amber-300 to-red-500 shadow-xl"
              >
                <div className="absolute h-52 w-52 rounded-full border-8 border-white/70" />
                <div className="absolute h-5 w-5 rounded-full bg-white" />
                <div className="absolute -right-2 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[16px] border-l-[28px] border-y-transparent border-l-slate-900" />
                <span className="z-10 max-w-40 text-center text-2xl font-black text-white drop-shadow">
                  {isSpinning ? "抽選中..." : selected ? selected.name : "START"}
                </span>
              </motion.div>

              <Button
                onClick={spinRoulette}
                disabled={candidates.length === 0 || isSpinning}
                className="px-8 py-6 text-lg"
              >
                <RotateCw
                  className={isSpinning ? "animate-spin" : ""}
                  size={22}
                />
                ルーレットを回す
              </Button>
            </div>
          </section>
        </div>

        <AnimatePresence mode="wait">
          {selected && !isSpinning && (
            <motion.section
              key={selected.name + spinCount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">
                    問答無用の科学的激辛アレンジ
                  </p>
                  <h2 className="text-3xl font-black">{selected.name}</h2>
                </div>
                <p className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">
                  調理時間：{selected.time}
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-orange-50 p-5">
                    <h3 className="mb-3 font-bold">必要な冷蔵庫材料</h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.ingredients.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white px-3 py-1 text-sm shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-red-100 p-5 text-sm text-red-900">
                    <div className="mb-1 font-black">使用危険食材</div>
                    <div className="text-lg font-black">{selected.pepper}</div>
                    <div className="mt-1 text-xs opacity-80">
                      {getPepperInfo(selected.pepper)?.shu}
                    </div>
                    <div className="mt-2 text-xs leading-5">
                      {getPepperInfo(selected.pepper)?.description}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black p-5 text-green-400 shadow-inner">
                    <div className="mb-3 text-sm font-bold tracking-widest">
                      CAPSAICIN STRUCTURE ANALYSIS
                    </div>
                    <div className="space-y-3 text-sm">
                      <Bar label="辛味拡散" value={selected.analysis.spread} />
                      <Bar label="蓄熱性能" value={selected.analysis.heat} />
                      <Bar label="酸性刺激" value={selected.analysis.acid} />

                      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-red-300">
                        危険指数：{selected.analysis.danger}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4">
                    <div className="mb-1 text-xs font-black tracking-widest text-red-500">
                      SCIENTIFIC SPICY COOKING
                    </div>
                    <p className="text-sm leading-6 text-red-900">
                      このレシピは「油による辛味拡散」「とろみによる蓄熱」「酸味による痛覚刺激」を組み合わせ、カプサイシンを通常より強く長く感じさせる構造になっています。
                    </p>
                  </div>

                  <h3 className="mb-3 font-bold">
                    詳しい作り方＆辛味増幅ポイント
                  </h3>
                  <ol className="space-y-4 text-sm leading-7 text-slate-700">
                    {selectedSteps.map((step, index) => (
                      <li
                        key={step.title}
                        className="rounded-2xl bg-white p-4 shadow-sm"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
                            {index + 1}
                          </span>
                          <span className="font-bold text-slate-900">
                            {step.title}
                          </span>
                        </div>
                        <div className="space-y-3 pl-9 text-[15px] leading-7 text-slate-700">
                          <p>{step.cook}</p>
                          <div className="rounded-2xl bg-orange-50 p-3 text-orange-900">
                            <span className="font-bold">辛味増幅：</span>
                            {step.science}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-orange-950 p-5 text-orange-100">
                <div className="mb-3 text-sm font-bold tracking-widest text-orange-300">
                  DANGER STRUCTURE
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.structure.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-2 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}