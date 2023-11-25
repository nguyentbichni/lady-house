import { Tabs, Card } from 'antd'

import UserInfo from './components/UserInfo'
import OrderHistories from './components/OrderHistories'
import FavoriteProducts from './components/FavoriteProducts'
import ChangePassword from './components/ChangePassword'

function ProfilePage() {
  return (
    <Card bordered={false} size="small">
      <Tabs
        tabPosition="left"
        items={[
          {
            label: 'Thông tin cá nhân',
            key: 1,
            children: <UserInfo />,
          },
          {
            label: 'Lịch sử mua hàng',
            key: 2,
            children: <OrderHistories />,
          },
          {
            label: 'Sản phẩm yêu thích',
            key: 3,
            children: <FavoriteProducts />,
          },
          {
            label: 'Đổi mật khẩu',
            key: 4,
            children: <ChangePassword />,
          },
        ]}
      />
    </Card>
  )
}

export default ProfilePage
