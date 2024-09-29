import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
    content: ["https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
              "https://thnamson.pgdductrong.edu.vn/wp-content/uploads/sites/476/2021/09/HINH-TRUONG-2.jpg",
              "https://lh3.googleusercontent.com/proxy/tQV0hCa5xFD59rhGJ-FNBkxKAdTMVUepf_d6NJXk-tVyBoYMHDEDir60UCgXjmxHtfIs-jQa9IPVj2BFwjdNaU9F_jqsxdG_X-GyO8boGtIE0_7QWDEza1FvR4HXGbkV5BDLLnglWWy0dxg",
              "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KY0B0g9z4wgnQoXqxJ0bDa5ZLxy6gd0eWg&s",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KY0B0g9z4wgnQoXqxJ0bDa5ZLxy6gd0eWg&s",
    ],
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
    content:[ "https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KY0B0g9z4wgnQoXqxJ0bDa5ZLxy6gd0eWg&s",
      "https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
      "https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
      "https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
      "https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
    ],
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
    content: [
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      
     ],
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
    content: ["https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
    ],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 11,
    type: "image",
    content: ["https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
      "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
      "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ"
    ],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 12,
    type: "image",
    content: ["https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
      "https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
      "https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
    ],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 13,
    type: "image",
    content: ["https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
      "https://photos.zillowstatic.com/fp/27c501184cf7e7fc1ad5c9be630a6b34-rentals_medium_500_500.webp",
    ],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 14,
    type: "image",
    content: ["https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
      "https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",
    ],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 15,
    type: "image",
    content: [
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      
     ],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 16,
    type: "image",
    content: ["https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ",],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 17,
    type: "image",
    content: ["https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ"],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },
  {
    id: 18,
    type: "image",
    content: ["https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ"],
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

  {
    id: 26,
    type: "image",
    content: ["https://lh3.googleusercontent.com/proxy/gvzHTh7IWj4qU_2eXH5w7cTM8Mz047dLKjlljjB3nqKopkHS5nDaikzTcPpzzgh0mc1jFBBSLwnZFkHbftrYdb2a9rxABUBZFd0hmzXWZK4CSfNmQHd2eBJJ"],
    description: "Hình ảnh mô tả sản phẩm mới ra mắt.", // Mô tả về hình ảnh
    uploadedBy: "admin", // Người tải lên
  },

];

const dataPrivate = [
  {
    id: 1,
    type: "notification",
    content: "Bạn có một thông báo mới từ hệ thống.",
  },
  {
    id: 2,
    type: "image",
    content: ["https://lh6.googleusercontent.com/proxy/BseziCdlL_4MHG1xZBrLoaxYdGpVgdo2zeaEwDcEjZDKu383cjN6TC4MMMKZ_7TCDvoV5uEAMm3-i5Ohf9Ij9n2Hdl-BPFEuIPOeMlrZWiiPnTtRAEiK9g",
      "https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      "https://thnamson.pgdductrong.edu.vn/wp-content/uploads/sites/476/2021/09/HINH-TRUONG-2.jpg",
    ], // URL của hình ảnh
  },
  {
    id: 3,
    type: "registration",
    content: "https://www.google.com/", // Link đăng ký
  },
  {
    id: 4,
    type: "notification",
    content: "Hạn chót nộp bài tập là ngày 30 tháng này.",
  },
  {
    id: 5,
    type: "image",
    content: ["https://i.pinimg.com/564x/b9/3f/03/b93f0319675b2a7c8ba1872411d27b2a.jpg",
      "https://thnamson.pgdductrong.edu.vn/wp-content/uploads/sites/476/2021/09/HINH-TRUONG-2.jpg",
      "https://lh6.googleusercontent.com/proxy/BseziCdlL_4MHG1xZBrLoaxYdGpVgdo2zeaEwDcEjZDKu383cjN6TC4MMMKZ_7TCDvoV5uEAMm3-i5Ohf9Ij9n2Hdl-BPFEuIPOeMlrZWiiPnTtRAEiK9g"
    ], // URL của hình ảnh
  },
  {
    id: 6,
    type: "registration",
    content: "https://example.com/event", // Link sự kiện
  },
];

const datafake = [
  {id:"1",name: "Nguyễn Văn Aa",grade:5, class:"5B"},
  {id:"2",name: "Trần Đình B",grade:5, class:"4A"},
  {id:"3",name: "Phạm Thị C",grade:5, class:"7A"},
  {id:"4",name: "Nguyễn Thị D",grade:5, class:"8B"},
  {id:"5",name: "Cao Văn E",grade:5, class:"3A"},
];


// Lấy dữ liệu với token
export const getDataWithToken = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(datafake); 
    }, 1000); // Mô phỏng độ trễ 1 giây
  });
};
//lấy dữ liệu action rieng với token
export const getPrivateActions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(dataPrivate); 
    }, 1000); // Mô phỏng độ trễ 1 giây
  });
};
//lấy dữ liệu action chung với token
export const getPublicActions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(dataPublic); 
    }, 1000); // Mô phỏng độ trễ 1 giây
  });
};


import { fetchApi } from "./baseApi";

export const Login = async ({email, password}) => {
  try{
    const response = await fetchApi('/api/school/v1/parent/login', 'POST', {email, password});
    if(!response.ok){
      throw new Error('Login faild');
    }
    const data = await response.json();
    if (data.code==200) {
      await AsyncStorage.setItem('refreshToken', data.data.token.refresh_token);
      await AsyncStorage.setItem('accessToken', data.data.token.access_token);
    }
    return data;
}catch(error){
  console.error('Login error:', error.message);
  throw error; 
};
}


export const getActions = async (id, type, search = null) => {
  try{
    let url = `/api/school/v1/parent/contacts/${id}`;
    const params = new URLSearchParams();
    if (type) {
      params.append('type', type); 
    }
    if (search) {
      params.append('search', search);
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetchApi(url);
    if(!response.ok){
      throw new Error('Get Data Failed');
    }
    const data = await response.json();
    return data;
  }catch(error){
    console.error(error.message)
    throw error;
  }
}

export const getList = async () => {
  try{
    const response = await fetchApi("/api/school/v1/parent/classes")
    const data = await response.json();
    return data;
  }catch(error){
    Alert.alert(error.message)
    throw error;
  }
}

