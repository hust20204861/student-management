import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, ActivityIndicator, Text } from "react-native";

const dataPublic = [
  {
    id: 1,
    type: "notification",
    content: "Nhà trường có thông báo mới. Phụ huynh chú ý cập nhật tình hình cho các con.",
    timestamp: "2024-09-19T10:00:00Z",
    priority: "high",
  },
  {
    id: 2,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.",
    uploadedBy: "admin",
  },
  {
    id: 3,
    type: "registration",
    content: "https://example.com/register",
    eventName: "Hội thảo về công nghệ",
    deadline: "2024-09-25T17:00:00Z",
  },
  {
    id: 5,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/tQV0hCa5xFD59rhGJ-FNBkxKAdTMVUepf_d6NJXk-tVyBoYMHDEDir60UCgXjmxHtfIs-jQa9IPVj2BFwjdNaU9F_jqsxdG_X-GyO8boGtIE0_7QWDEza1FvR4HXGbkV5BDLLnglWWy0dxg",
    description: "Bức ảnh từ sự kiện thể thao gần đây.",
    uploadedBy: "student123",
  },
  {
    id: 6,
    type: "registration",
    content: "https://example.com/event",
    eventName: "Cuộc thi lập trình",
    deadline: "2024-10-01T23:59:59Z",
  },
  {
    id: 7,
    type: "notification",
    content: "Có một cập nhật mới cho ứng dụng, hãy kiểm tra ngay!",
    timestamp: "2024-09-19T09:15:00Z",
    priority: "low",
  },
  {
    id: 8,
    type: "image",
    content: "https://thnamson.pgdductrong.edu.vn/wp-content/uploads/sites/476/2021/09/HINH-TRUONG-2.jpg",
    description: "Hình ảnh của buổi lễ tốt nghiệp.",
    uploadedBy: "faculty",
  },
  {
    id: 9,
    type: "registration",
    content: "https://example.com/conference",
    eventName: "Hội nghị khoa học quốc tế",
    deadline: "2024-10-15T18:00:00Z",
  },
  {
    id: 10,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 11,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 12,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 13,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 14,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 15,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 16,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 17,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 18,
    type: "image",
    content: "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 19,
    type: "notification",
    content: "Nhà trường có thông báo mới. Phụ huynh chú ý cập nhật tình hình cho các con.",
    timestamp: "2024-09-19T10:00:00Z",
    priority: "high",
  },
  {
    id: 20,
    type: "notification",
    content: "Nhà trường có thông báo mới. Phụ huynh chú ý cập nhật tình hình cho các con.",
    timestamp: "2024-09-19T10:00:00Z",
    priority: "high",
  },
  {
    id: 21,
    type: "notification",
    content: "Nhà trường có thông báo mới. Phụ huynh chú ý cập nhật tình hình cho các con.",
    timestamp: "2024-09-19T10:00:00Z",
    priority: "high",
  },
  {
    id: 22,
    type: "notification",
    content: "Nhà trường có thông báo mới. Phụ huynh chú ý cập nhật tình hình cho các con.",
    timestamp: "2024-09-19T10:00:00Z",
    priority: "high",
  },
  {
    id: 23,
    type: "notification",
    content: "Nhà trường có thông báo mới. Phụ huynh chú ý cập nhật tình hình cho các con.",
    timestamp: "2024-09-19T10:00:00Z",
    priority: "high",
  },
  {
    id: 24,
    type: "notification",
    content: "Nhà trường có thông báo mới. Phụ huynh chú ý cập nhật tình hình cho các con.",
    timestamp: "2024-09-19T10:00:00Z",
    priority: "high",
  },
  {
    id: 25,
    type: "notification",
    content: "Nhà trường có thông báo mới. Phụ huynh chú ý cập nhật tình hình cho các con.",
    timestamp: "2024-09-19T10:00:00Z",
    priority: "high",
  },

  
];

const fetchData = (page, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const newData = dataPublic.slice(startIndex, startIndex + limit);
      resolve(newData);
    }, 1000); // Giả lập độ trễ 4 giây
  });
};

const ApplicationScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  const loadItems = async () => {
    if (loading || endReached) return;

    setLoading(true);
    const newItems = await fetchData(page, 5); // Tải 5 mục

    if (newItems.length === 0) {
      setEndReached(true);
    } else {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !loading && !endReached) {
      loadItems();
    }
  };

  const renderItem = (item) => {
    switch (item.type) {
      case "notification":
        return (
          loading ? (<View key={item.id}><Text>đang tải</Text></View>) : (
            <View key={item.id} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold", color: "red" }}>{item.content}</Text>
            <Text>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
          )
          
        );
      case "image":
        return (
           loading ? (<View  key={item.id}>
            <Image
            source={{ uri: "https://i.pinimg.com/originals/ca/89/fb/ca89fbce5e5c68f46d5330946c58ddc6.gif" }}
            style={{ width: '100%', height: 200, marginBottom: 10 }}
          />
          <Text>{item.description}</Text>
            </View>
            ) : (
            <View key={item.id} style={{ marginBottom: 10 }}>
            <Image source={{ uri: item.content }} style={{ width: '100%', height: 200 }} />
            <Text>{item.description}</Text>
            <Text style={{ fontStyle: "italic" }}>Uploaded by: {item.uploadedBy}</Text>
          </View>
        )
        
        );
      case "registration":
        return (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Event: {item.eventName}</Text>
            <Text>Register here: {item.content}</Text>
            <Text>Deadline: {new Date(item.deadline).toLocaleString()}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {items.map(renderItem)}
        {endReached && (
          <Text style={{ textAlign: "center", marginVertical: 20 }}>Hết</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ApplicationScreen;
