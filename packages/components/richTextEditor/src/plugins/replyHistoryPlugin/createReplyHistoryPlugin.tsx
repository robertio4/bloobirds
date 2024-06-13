import { ELEMENT_REPLY_HISTORY } from './defaults';
import spacetime from 'spacetime';

export const createReplyHistoryPlugin = () => ({
  key: ELEMENT_REPLY_HISTORY,
  isElement: true,
  isVoid: true,
  then: (editor, { type }) => ({
    deserializeHtml: {
      getNode: el => ({
        type,
        html: el.getAttribute('html'),
      }),
      rules: [{ validNodeName: 'REPLY-HISTORY' }],
    },
  }),
  serializeHtml: ({ element }) => {
    return (
      <>
        <br />
        <div className="gmail_quote">
          <div dir="ltr" className="gmail_attr">
            On {spacetime(element.sentAt).format('nice')}{' '}
            <a href={`mailto:${element.sentBy}`}>{element.sentBy}</a> wrote:
            <br />
          </div>
          <blockquote
            dangerouslySetInnerHTML={{ __html: element.html }}
            className="gmail_quote"
            style={{
              margin: '0px 0px 0px 0.8ex',
              borderLeft: '1px solid rgb(204,204,204)',
              paddingLeft: '1ex',
            }}
          />
        </div>
      </>
    );
  },
});
