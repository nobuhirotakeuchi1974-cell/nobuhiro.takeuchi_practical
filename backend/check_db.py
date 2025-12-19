from db_control.connect_MySQL import engine
from sqlalchemy import text

print("=" * 70)
print("データベース接続確認")
print("=" * 70)

try:
    with engine.connect() as conn:
        # テーブル一覧を取得
        print("\n✅ データベースに接続成功！")
        print("\n📋 テーブル一覧:")
        tables = conn.execute(text("SHOW TABLES")).fetchall()
        
        if tables:
            for table in tables:
                table_name = table[0]
                print(f"\n{'=' * 70}")
                print(f"📄 テーブル: {table_name}")
                print('=' * 70)
                
                # 各テーブルのレコード数を表示
                count = conn.execute(text(f"SELECT COUNT(*) FROM {table_name}")).fetchone()[0]
                print(f"レコード数: {count}")
                
                # テーブル構造を表示
                print("\n🔧 テーブル構造:")
                columns = conn.execute(text(f"DESCRIBE {table_name}")).fetchall()
                print(f"{'カラム名':<20} {'型':<20} {'NULL':<8} {'キー':<8} {'デフォルト':<15}")
                print("-" * 70)
                for col in columns:
                    field = col[0]
                    type_ = col[1]
                    null = col[2]
                    key = col[3]
                    default = str(col[4]) if col[4] is not None else 'None'
                    print(f"{field:<20} {type_:<20} {null:<8} {key:<8} {default:<15}")
        else:
            print("  テーブルが見つかりません")
        
        print("\n" + "=" * 70)
        print("確認完了！")
        print("=" * 70)
        
except Exception as e:
    print(f"\n❌ エラー: {e}")
    print("データベース接続に失敗しました")
