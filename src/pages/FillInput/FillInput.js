import React, { useEffect, useMemo } from "react";
import LabelStudio from "@custom/lsf/js/main";
import tasks from "../../data/lesson_prepared.json";

import "@custom/lsf/css/main.css";

const LSFFillInBlank = () => {
    const task = useMemo(() => tasks[0], []);

    useEffect(() => {
        // Tạo một thể hiện của Label Studio trên thành phần componentDidMount
        const lsfInstance = new LabelStudio("lsf", {
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
                "custom-ui",
                "layout:fill-in-blank",
                "layout:fill-in-blank:title-quiz",
                "layout:fill-in-blank:player-quiz",
                "layout:fill-in-blank:footer-quiz",
                // "layout:fill-in-blank:footer-detail",
                "layout:fill-in-blank:retry-btn",
                "layout:fill-in-blank:check-btn",
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

            onRetryTask: function (data) {
                console.log("retryTask: ", data);
            },

            onCheckTask: function (data) {
                console.log("checkTask: ", data);
            },
        });

        return () => {
            // Hủy đăng ký sự kiện và dọn sạch
            lsfInstance.destroy();
        };
    }, []);

    return (
        <div style={{ padding: 24, maxWidth: 712, margin: "0px auto" }}>
            <div id="lsf" />
        </div>
    );
};

export const FillInputPage = () => {
    return <LSFFillInBlank />;
};

FillInputPage.path = "fillinput";
FillInputPage.title = "FillInput Page";
