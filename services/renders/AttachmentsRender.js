// import { ImagesRender } from "./ImagesRender";
// import { View } from "react-native";
// import { VideosRender } from "./VideosRender";
// import PdfsRender from "./PdfsRender";
// import DocumentsRender from "./DocumentsRender";

// export default AttachmentsRender = ({items}) => {
//     const imageItems = [];
//     const videoItems = [];
//     const pdfItems = [];
//     const docItems = [];
  
//     items.forEach(item => {
//       switch (item.type) {
//         case 8: 
//           imageItems.push(item.info); 
//           break;
//         case 1:
//           videoItems.push(item.info); 
//           break;
//         case 3: 
//           pdfItems.push(item); 
//           break;
//         case 21:
//           docItems.push(item);
//           break;
//         default:
//           break; 
//       }
//     });
//     return (
//       <View>
//         {imageItems.length > 0 && (
//           <ImagesRender item={imageItems} style={{ width: '100%', height: 200, borderRadius: 8 }} />
//         )}
//         {videoItems.length > 0 && (
//           <VideosRender item={videoItems} style={{ width: '100%', height: 200, borderRadius: 8 }} />
//         )}
//         {/* {pdfItems.length > 0 && (
//           <PdfsRender item={pdfItems} style={{ width: '100%', height: 200, borderRadius: 8 }} />
//         )}
//         {docItems.length > 0 && (
//           <DocumentsRender item={docItems}/>
//         )}  */}
//       </View>
      
//     );

// }
import { ImagesRender } from "./ImagesRender";
import { View } from "react-native";
import { VideosRender } from "./VideosRender";
import PdfsRender from "./PdfsRender";
import DocumentsRender from "./DocumentsRender";
import React, { useMemo } from "react";

const AttachmentsRender = ({ items }) => {
  // Sử dụng useMemo để tối ưu hóa việc tính toán các mảng item
  const imageItems = useMemo(() => {
    return items.filter(item => item.type === 8).map(item => item.info);
  }, [items]);

  const videoItems = useMemo(() => {
    return items.filter(item => item.type === 1).map(item => item.info);
  }, [items]);

  const pdfItems = useMemo(() => {
    return items.filter(item => item.type === 3);
  }, [items]);

  const docItems = useMemo(() => {
    return items.filter(item => item.type === 21);
  }, [items]);

  return (
    <View>
      {imageItems.length > 0 && (
        <ImagesRender item={imageItems} style={{ width: "100%", height: 200, borderRadius: 8 }} />
      )}
      {videoItems.length > 0 && (
        <VideosRender item={videoItems} style={{ width: "100%", height: 200, borderRadius: 8 }} />
      )}
      {pdfItems.length > 0 && (
        <PdfsRender item={pdfItems} style={{ width: "100%", height: 200, borderRadius: 8 }} />
      )}
      {docItems.length > 0 && <DocumentsRender item={docItems} />}
    </View>
  );
};

export default React.memo(AttachmentsRender);
