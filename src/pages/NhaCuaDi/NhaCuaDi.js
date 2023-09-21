import React from "react";
import { ParagraphAnswer } from "../../components/ParagraphAnswer/ParagraphAnswer";
import { DragAndDrop } from "../../components/DragAndDrop/DragAndDrop";
import "./styles.scss";
const sequences = "The <brown> fox <jumped> over the <dog>";

export const NhaCuaDi = () => {
    return (
        <div>
            <DragAndDrop sequences={sequences} />
            <ParagraphAnswer sequences={sequences} />
        </div>
    );
};

NhaCuaDi.path = "nhacuadi";
NhaCuaDi.title = "NhaCuaDiPage";
