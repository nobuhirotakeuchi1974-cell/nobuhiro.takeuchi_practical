# 🎉 Azure App ServiceへのFastAPIデプロイ成功までの全工程（詳細版）

---

## **1. 事前準備（完了済み）**

### **1-1. プロジェクト構成**
```
backend/
├── app.py                    # FastAPIアプリケーション
├── requirements.txt          # 依存パッケージ
├── .env                      # 環境変数（ローカル用）
├── startup.txt              # スタートアップコマンド参考
└── db_control/              # データベース関連
    ├── connect_MySQL.py
    ├── create_tables_MySQL.py
    ├── crud.py
    └── mymodels_MySQL.py
```

### **1-2. requirements.txtの内容**
```txt
fastapi==0.109.0
uvicorn==0.27.0
gunicorn==21.2.0
sqlalchemy==2.0.23
pydantic==2.5.3
python-dotenv==1.0.0
requests==2.31.0
pandas==2.1.4
numpy==1.26.2
python-dateutil==2.8.2
pymysql>=1.0.2
```

### **1-3. .envファイルの内容（ローカル用）**
```env
DB_USER=tech0gen11
DB_PASSWORD=Students11
DB_HOST=rg-001-gen11-step3-class2.mysql.database.azure.com
DB_PORT=3306
DB_NAME=takeuchinobuhiro_db
HOST=0.0.0.0
PORT=8000
```

### **1-4. GitHubリポジトリ**
- リポジトリ: `git@github.com:nobuhirotakeuchi1974-cell/backend-fastapi-deploy.git`
- ブランチ: `main`
- backendフォルダのみを独立したリポジトリとして管理

---

## **2. VS Codeでの設定**

### **2-1. Azure App Service拡張機能のインストール**
**手順:**
1. 拡張機能マーケットプレイスを開く（`Ctrl + Shift + X`）
2. 「Azure App Service」を検索
3. `ms-azuretools.vscode-azureappservice` をインストール

### **2-2. Azureアカウントへのサインイン**
**手順:**
1. `Ctrl + Shift + P` でコマンドパレット
2. 「Azure: Sign In」を実行
3. ブラウザで認証
4. VS Codeに戻って確認

### **2-3. .vscode/settings.jsonの設定**
**最終的な設定（推奨）:**
```json
{
}
```
**理由:** 
- デフォルト設定を保存すると意図しないフォルダがデプロイされる可能性
- 毎回フォルダを選択する方が確実

**または:**
```json
{
    "appService.defaultWebAppToDeploy": "/subscriptions/9b680e6d-e5a6-4381-aad5-a30afcbc8459/resourceGroups/rg-001-gen11/providers/Microsoft.Web/sites/tech0-gen-11-step3-2-py-62",
    "appService.deploySubpath": "backend"
}
```

### **2-4. .gitignoreの設定（推奨）**
backendフォルダに`.gitignore`を作成:
```gitignore
__pycache__/
*.pyc
*.pyo
.env
.vscode/
myenv/
venv/
*.db
.DS_Store
```

---

## **3. Azureでの事前準備（完了済み）**

### **3-1. App Serviceの作成**
**設定内容:**
- **名前:** tech0-gen-11-step3-2-py-62
- **ランタイムスタック:** Python 3.12
- **リージョン:** Japan East（または適切なリージョン）
- **プラン:** 適切なApp Service Plan

### **3-2. Azure MySQLデータベース**
**既存の接続情報:**
- **ホスト:** rg-001-gen11-step3-class2.mysql.database.azure.com
- **ポート:** 3306
- **データベース名:** takeuchinobuhiro_db
- **ユーザー:** tech0gen11
- **パスワード:** Students11

---

## **4. デプロイ手順（試行錯誤の履歴）**

### **問題1: ワークスペース全体をデプロイ**
**実施したこと:**
- エクスプローラーでbackendフォルダを選択せず、ワークスペース全体をデプロイ
- `myenv`フォルダ（仮想環境）含め全てがアップロードされた

**結果:**
- デプロイに8分以上かかる
- 不要なファイルが大量にアップロードされた

**解決策:**
- VS Codeを強制終了（`Alt + F4`）
- `.vscode/settings.json`を修正
- 最終的にAzure Portalから設定

### **問題2: App Serviceが表示されない**
**実施したこと:**
- VS CodeのAzure拡張機能でApp Servicesを展開
- サブスクリプションを選択
- 検索しても「No matching resources found」

**原因:**
- 拡張機能の表示問題
- キャッシュや同期の遅延

**解決策:**
- Azure Portalで直接GitHubと連携

---

## **5. 最終的な成功手順**

### **5-1. Azure Portal - デプロイセンターの設定**
**場所:** App Service → デプロイ → デプロイセンター → 設定タブ

**設定内容:**
| 項目 | 値 | 説明 |
|------|-----|------|
| **ソース** | GitHub | コード取得元 |
| **GitHub** | - | - |
| **組織** | nobuhirotakeuchi1974-cell | GitHubアカウント/組織 |
| **リポジトリ** | backend-fastapi-deploy | リポジトリ名 |
| **ブランチ** | main | デプロイするブランチ |
| **ビルド** | - | - |
| **ビルドプロバイダー** | GitHub Actions | CI/CDツール |
| **ランタイムスタック** | Python | 言語 |
| **バージョン** | 3.12 | Pythonバージョン |

**保存後:**
- GitHub Actionsワークフローが自動生成される
- `.github/workflows/`にYAMLファイルが作成される
- プッシュするたびに自動デプロイされる

---

### **5-2. Azure Portal - 環境変数の設定**
**場所:** App Service → 設定 → 環境変数 → アプリ設定タブ

**追加する環境変数:**
| 名前 | 値 | 説明 |
|------|-----|------|
| **DB_USER** | tech0gen11 | MySQLユーザー名 |
| **DB_PASSWORD** | Students11 | MySQLパスワード |
| **DB_HOST** | rg-001-gen11-step3-class2.mysql.database.azure.com | MySQLホスト |
| **DB_PORT** | 3306 | MySQLポート |
| **DB_NAME** | takeuchinobuhiro_db | データベース名 |

**設定方法:**
1. 「+ 追加」ボタンをクリック
2. 名前と値を入力
3. 「適用」をクリック
4. 全て追加後、上部の「適用」をクリック

**注意:**
- これらの環境変数は`.env`ファイルの代わり
- アプリ再起動時に反映される

---

### **5-3. Azure Portal - スタートアップコマンドの設定**
**場所:** App Service → 設定 → 構成 → 全般設定タブ

**設定内容:**
```bash
uvicorn app:app --host 0.0.0.0 --port ${PORT:-8000}
```

**代替案（本番推奨）:**
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app --bind 0.0.0.0:8000
```

**違い:**
- **uvicorn:** シンプル、シングルプロセス
- **gunicorn:** 複数ワーカー、高パフォーマンス

**設定方法:**
1. 「スタートアップコマンド」欄に入力
2. 画面下部の「適用」をクリック

---

### **5-4. その他の重要な設定（確認推奨）**

#### **A. 構成 → 全般設定**
| 項目 | 値 | 説明 |
|------|-----|------|
| **スタック** | Python | ランタイム |
| **バージョン** | Python 3.12 | Pythonバージョン |
| **Always On** | オン（推奨） | アプリを常に起動状態に |
| **HTTP バージョン** | 2.0 | HTTP/2対応 |

#### **B. CORS設定（必要に応じて）**
**場所:** App Service → API → CORS

**設定内容:**
- フロントエンドのURLを追加
- 開発中は`*`（全て許可）も可能

**例:**
```
https://your-frontend.azurewebsites.net
http://localhost:3000
```

#### **C. スケーリング設定（必要に応じて）**
**場所:** App Service → 設定 → スケールアップ/スケールアウト

---

## **6. デプロイ確認**

### **6-1. ログの確認**
**場所:** App Service → デプロイ → デプロイセンター → ログタブ

**確認内容:**
- 最新のデプロイステータス: **成功（アクティブ）**
- デプロイID: 3814592
- 時刻: 2025/12/16, 10:38:45 AM
- メッセージ: "Created via a push deployment"

### **6-2. アプリケーションの動作確認**
**URL:** `https://tech0-gen-11-step3-2-py-62.azurewebsites.net`

**期待される結果:**
```json
{"message": "fastAPI top page!"}
```

**APIドキュメント:**
`https://tech0-gen-11-step3-2-py-62.azurewebsites.net/docs`

### **6-3. ログストリーミング（トラブルシューティング用）**
**場所:** App Service → 監視 → ログストリーム

**用途:**
- リアルタイムでアプリケーションログを確認
- エラーのデバッグ

---

## **7. まとめ：設定チェックリスト**

### **✅ VS Code側**
- [ ] Azure App Service拡張機能インストール
- [ ] Azureアカウントサインイン
- [ ] .gitignore設定（myenv除外）
- [ ] GitHubにbackendリポジトリをプッシュ

### **✅ Azure Portal側**
- [ ] App Service作成済み
- [ ] デプロイセンター → GitHubと連携
  - [ ] 組織: nobuhirotakeuchi1974-cell
  - [ ] リポジトリ: backend-fastapi-deploy
  - [ ] ブランチ: main
  - [ ] ビルドプロバイダー: GitHub Actions
- [ ] 環境変数設定（5つ）
  - [ ] DB_USER
  - [ ] DB_PASSWORD
  - [ ] DB_HOST
  - [ ] DB_PORT
  - [ ] DB_NAME
- [ ] スタートアップコマンド設定
- [ ] デプロイ成功確認
- [ ] アプリ動作確認

---

**所要時間:** 約30-40分（試行錯誤含む）  
**最終結果:** ✅ デプロイ成功！

お疲れ様でした！🚀
