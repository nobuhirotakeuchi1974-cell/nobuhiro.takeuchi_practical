from db_control.connect_MySQL import engine
from sqlalchemy import text

print("=" * 50)
print("顧客データの詳細確認")
print("=" * 50)

try:
    with engine.connect() as conn:
        # 全顧客データを取得
        customers = conn.execute(text("SELECT * FROM customers")).fetchall()
        
        if customers:
            print(f"\n✅ 顧客データ: {len(customers)}件\n")
            for customer in customers:
                print(f"customer_id: {customer[0]}")
                print(f"customer_name: {customer[1]}")
                print(f"age: {customer[2]}")
                print(f"gender: {customer[3]}")
                print("-" * 50)
        else:
            print("顧客データが見つかりません")
        
except Exception as e:
    print(f"\n❌ エラー: {e}")
