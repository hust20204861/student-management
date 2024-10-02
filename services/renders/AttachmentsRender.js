import { ImagesRender } from "./ImagesRender";
import { View } from "react-native";
import { VideosRender } from "./VideosRender";
import PdfsRender from "./PdfsRender";
import DocumentsRender from "./DocumentsRender";
import React, { useMemo, useEffect } from "react";
import PowerPointsRender from "./PowerPointsRender";
import ExcelsRender from "./ExcelsRender";
import AudioesRender from "./AudioesRender";


const AttachmentsRender = ({ items }) => {
  useEffect(() => {
  }, [items]);
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

  const pptItems = useMemo(() => {
    return items.filter(item => item.type === 23);
  }, [items]);

  const xlsItems = useMemo(() => {
    return items.filter(item => item.type === 22);
  }, [items]);

  const audioItems = useMemo(() => {
    return items.filter(item => item.type === 0);
  }, [items]);
  return (
    <View>
      {imageItems.length > 0 && <ImagesRender item={imageItems}/>}
      {videoItems.length > 0 && <VideosRender item={videoItems}/>}
      {pdfItems.length > 0 && <PdfsRender item={pdfItems}/>}
      {docItems.length > 0 && <DocumentsRender item={docItems}/>}
      {pptItems.length > 0 && <PowerPointsRender item={pptItems}/>}
      {xlsItems.length > 0 && <ExcelsRender item={xlsItems} />}
      {audioItems.length > 0 && <AudioesRender item={audioItems} />}
    </View>
  );
};

export default React.memo(AttachmentsRender);
