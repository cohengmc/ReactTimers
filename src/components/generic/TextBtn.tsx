const TextBtn = ({ name }: { name: string }) => {
    return (
        <div>
            {' '}
            <button className="btn">
                <p className="btnNum">{name}</p>
            </button>
        </div>
    );
};
export default TextBtn;
