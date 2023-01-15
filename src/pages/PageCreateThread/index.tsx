import {useState} from "react";
import {TopNav} from "../../components/TopNav";
import {ThreadCreateRequest} from "../../openapi";
import {rootStyle} from "../common";
import {contentStyle, buttonStyle, textBoxStyle, textTitleStyle} from "./style";

export const PageCreateThread: React.FC = () => {

    const [textValue, setTextValue] = useState("")
    const onButtonClick = () => {
        // NOTE: ダミーのPost
        if (textValue !== ""){
            const request: ThreadCreateRequest =  { title: textValue }
            alert(`スレッドを作成します。Request: ${JSON.stringify(request)}`)
        }
        else{
            alert(`スレッド名を入力して下さい`)
        }
    }

    return (
        <div style={rootStyle}>
            <TopNav hasCreateThreadLink={false}/>
            <div style={contentStyle}>
                <div style={textTitleStyle}>
                    スレッド新規作成
                </div>
                <input type="text" style={textBoxStyle} onChange={(e) => setTextValue(e.target.value)}></input>
                <button style={buttonStyle} onClick={onButtonClick}>作成</button>
            </div>
        </div>
    )
}