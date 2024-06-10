import { useAssets } from 'expo-asset';
import React, { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

type Props = {

};

const Map = (props: Props) => {


    const [assets] = useAssets([require('../assets/index.html')]);
    const [htmlString, setHtmlString] = useState<string>();

    const dimensions = useWindowDimensions();

    useEffect(() => {
        if (assets) {
            fetch(assets[0].localUri || '')
                .then((res) => res.text())
                .then((html) => {
                    setHtmlString(html);
                });
        }
    }, [assets]);


    if (!htmlString) {
        return <></>;
    }

    return (
        <WebView
            injectedJavaScript=''
            source={{
                html: htmlString,
            }}
            javaScriptEnabled
            style={{
                width: dimensions.width,
                height: dimensions.height,
            }}
            scrollEnabled={false}
            overScrollMode='never'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scalesPageToFit={false}
            containerStyle={{ flex: 1 }}
        />
    );
};

export default Map;