import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { headerText, inputPlaceholder, buttonText } = attributes;

    const blockProps = useBlockProps({
        className: "form-cta"
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Header Settings', 'cloudweb-blocks')}>
                    <TextControl
                        label={__('Header Text', 'cloudweb-blocks')}
                        value={headerText}
                        onChange={(value) => setAttributes({ headerText: value })}
                        placeholder={__('Enter header text...', 'cloudweb-blocks')}
                    />
                </PanelBody>

                <PanelBody title={__('Button Settings', 'cloudweb-blocks')}>
                    <TextControl
                        label={__('Button Text', 'cloudweb-blocks')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                        placeholder={__('Enter button text...', 'cloudweb-blocks')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="h2"
                    className="form-cta-header"
                    value={headerText}
                    onChange={(value) => setAttributes({ headerText: value })}
                    placeholder={__('Enter header text...', 'cloudweb-blocks')}
                />
                <form className="form-cta-form">
                    <input
                        type="text"
                        className="form-cta-input"
                        placeholder={inputPlaceholder}
                        readOnly
                    />
                    <button type="submit" className="form-cta-button">
                        {buttonText}
                    </button>
                </form>
            </div>
        </>
    );
}
