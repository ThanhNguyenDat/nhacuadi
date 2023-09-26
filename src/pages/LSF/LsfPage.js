import React, { useEffect, useMemo } from "react";
// import LabelStudio from "@custom/lsf/js/main";
import tasks from "../../data/lesson_prepared.json";
// import "@custom/lsf/css/main.css";

export const LsfPage = () => {
    const task = useMemo(() => tasks[0], []);
    useEffect(() => {
        // Tạo một thể hiện của Label Studio trên thành phần componentDidMount
        const lsfInstance = new window.LabelStudio("lsf", {
            config: `
            <View>
            <Style>
                .lsf-labels {
                    display: none;
                }
            </Style>
            <Labels name="label" toName="text">
                <Label value="answer" background="red"/>
            </Labels>
                <FillInBlankText name="text" value="$text"/>
            </View>
            `,

            interfaces: [
                "panel",
                "skip",
                "update",
                "submit",
                "controls",
                "bottombar",
                // "topbar",
                "custom-ui",
                // "side-column",
                // "annotations:menu",
                // "annotations:add-new",
                "annotations:delete",
                // "predictions:menu",
            ],
            task: {
                annotations: task.annotations,
                predictions: task.predictions,
                id: 1,
                data: { ...task.data },
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
            <div id="lsf" />
        </div>
    );
};

LsfPage.path = "lsf";
LsfPage.title = "LSF";
