import {Link} from "@fluentui/react";

import {headerStyle, textStyle, textStyle2} from "./style";

type TopNavProps = {
    hasCreateThreadLink: boolean
}

export const TopNav: React.FC<TopNavProps> = (props: TopNavProps) => {
    const {hasCreateThreadLink} = props;

    return (
        <div style={headerStyle}>
            <Link style={textStyle} href="/#">
                掲示板
            </Link>
            {
                hasCreateThreadLink && <Link style={textStyle2} href="/#/create-thread">スレッドを立てる</Link>
            }
        </div>
    )
}