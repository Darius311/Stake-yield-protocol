import './card.css'

type CardProps = {
    classname?: string;
    title?: React.ReactNode;
    content?: React.ReactNode;
}

export default function Card({classname, title, content}: CardProps) {
    return (
        <div className={`card-${classname}`}>
            <div>{title}</div>
            <div>{content}</div>
        </div>
    )
}