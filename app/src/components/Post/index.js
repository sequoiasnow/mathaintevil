import './styles.scss'


// Resize the iframe to be the size of the article.

function resizeIframe(iframe) {
  iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
}


class Post extends React.Component {

  constructor(props) {
    super(props);
    this.iframe = React.createRef();
    this.count = 0;
  }

  componentDidMount() {
    var iframe = this.iframe.current;

    console.log('The iframe is', iframe);

    const onLoad = function() {
      iframe.height = iframe.contentWindow.document.getElementById('page-container').scrollHeight + "px"
      console.log(this.count, iframe.height);
      if (iframe.height == "0px" && this.count++ < 10) {
        setTimeout(onLoad, 400);
      }
    }.bind(this);

    if (iframe.attachEvent){
      iframe.attachEvent("onload", onLoad) // IE
    } else {
      iframe.onload = onLoad // Normal Browser
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="post-container">
        <iframe ref={this.iframe} src={match.path + '.html'}></iframe>
      </div>
    )
  }
}

export default Post
