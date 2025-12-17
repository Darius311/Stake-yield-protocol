import './card.css'

type CardProps = {
    classname?: string;
    content?: React.ReactNode;
}

export default function CardModal({classname, content}: CardProps) {
    return (
        <div className={`card-${classname}`}>
            {content}
        </div>
    )
}