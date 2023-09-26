import React, { useEffect, useMemo, useState } from "react";
import LabelStudio from "@custom/lsf/js/main";
import "@custom/lsf/css/main.css";

import tasks from "../../data/lesson_prepared.json";

const LSFFillInBlank = ({ task }) => {
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
                annotations: task?.annotations ?? [],
                predictions: task?.predictions ?? [],
                id: 1,
                data: { ...task?.data },
            },

            onLabelStudioLoad: function (LS) {
                var c = LS.annotationStore.addAnnotation({
                    userGenerate: true,
                });
                LS.annotationStore.selectAnnotation(c.id);
            },

            onRetryTask: function (event) {
                console.log("retryTask: ", event);
            },

            onCheckTask: function (data) {
                console.log("checkTask: ", data);
            },
        });

        return () => {
            // Hủy đăng ký sự kiện và dọn sạch
            lsfInstance.destroy();
        };
    }, [task]);

    return (
        <div style={{ padding: 24, maxWidth: 712, margin: "0px auto" }}>
            <div id="lsf" />
        </div>
    );
};

export const FillInputPage = () => {
    const taskId = localStorage.getItem("taskId");

    var task = useMemo(() => {
        const t = tasks.filter(
            (task) => task.id.toString() === taskId.toString()
        );
        if (t.length === 0) {
            return tasks[0];
        }
        return t[0];
    }, [taskId]);

    return (
        <div>
            <div
                style={{
                    position: "fixed",
                    top: "96px",
                    left: "32px",
                    zIndex: "100",
                    width: "240px",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                }}
            >
                {tasks.map((_task) => (
                    <div
                        key={_task.id}
                        style={{
                            cursor: "pointer",
                            borderRadius: "50%",
                        }}
                        onClick={() => {
                            console.log("_task.id: ", _task.id);
                            localStorage.setItem("taskId", _task.id);
                            window.location.reload();
                        }}
                    >
                        {_task.id}
                    </div>
                ))}
            </div>
            <LSFFillInBlank task={task} />
        </div>
    );
};

FillInputPage.path = "fillinput";
FillInputPage.title = "FillInput Page";
