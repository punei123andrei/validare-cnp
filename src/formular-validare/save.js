import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { headerText, inputPlaceholder, buttonText } = attributes;

    // Ensure blockProps includes all necessary styles
    const blockProps = useBlockProps.save({
        className: "form-cta"
    });

    return (
        <div {...blockProps}>
            <RichText.Content
                tagName="h2"
                className="form-cta-header"
                value={headerText}
            />
            <form className="form-cta-form">
                <input
                    type="text"
                    className="form-cta-input"
                    placeholder={inputPlaceholder}
                />
                <button type="submit" className="form-cta-button">
                    {buttonText}
                </button>
            </form>
        </div>
    );
}
