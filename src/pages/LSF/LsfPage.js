import React, { useEffect } from "react";
import LabelStudio from "@custom/lsf/js/main";
import "@custom/lsf/css/main.css";

export const LsfPage = () => {
    useEffect(() => {
        // Tạo một thể hiện của Label Studio trên thành phần componentDidMount
        const lsfInstance = new LabelStudio("lsf", {
            config: `
                <View>
                <Image name="img" value="$image"></Image>
                <RectangleLabels name="tag" toName="img">
                    <Label value="Hello"></Label>
                    <Label value="World"></Label>
                </RectangleLabels>
                </View>
            `,

            interfaces: [
                // "panel",
                "skip",
                "update",
                "submit",
                "controls",
                "bottombar",
                // "topbar",
                "no-side-bar",
                // "side-column",
                // "annotations:menu",
                // "annotations:add-new",
                "annotations:delete",
                // "predictions:menu",
            ],
            task: {
                annotations: [],
                predictions: [],
                id: 1,
                data: {
                    image: "https://htx-misc.s3.amazonaws.com/opensource/label-studio/examples/images/nick-owuor-astro-nic-visuals-wDifg5xc9Z4-unsplash.jpg",
                },
            },

            onLabelStudioLoad: function (LS) {
                var c = LS.annotationStore.addAnnotation({
                    userGenerate: true,
                });
                LS.annotationStore.selectAnnotation(c.id);
            },
        });

        return () => {
            // Hủy đăng ký sự kiện và dọn sạch
            lsfInstance.destroy();
        };
    }, []);

    return (
        <div>
            <div id="lsf"></div>
        </div>
    );
};

LsfPage.path = "lsf";
LsfPage.title = "LSF";
