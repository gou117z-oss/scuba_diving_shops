export default function RegisterPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🤿</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        ショップ掲載のご案内
      </h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-left space-y-4">
        <p className="text-gray-700 leading-relaxed">
          当サイトへのショップ掲載をご希望の方は、以下の情報をご準備の上、
          サイト管理者までお問い合わせください。
        </p>
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="font-bold text-gray-800 text-sm mb-2">
            掲載に必要な情報
          </h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>・ショップ名（日本語・英語）</li>
            <li>・所在地（国・地域・都市・住所）</li>
            <li>・電話番号・メールアドレス</li>
            <li>・公式サイトURL</li>
            <li>・対応言語</li>
            <li>・対応コース（体験ダイビング、ファンダイブ等）</li>
            <li>・料金目安</li>
            <li>・ショップ紹介文</li>
          </ul>
        </div>
        <p className="text-sm text-gray-500">
          掲載は無料です。審査後に公開されます。
        </p>
      </div>
    </div>
  );
}
