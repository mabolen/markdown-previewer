marked.setOptions({
    breaks: true
});


const renderer = new marked.Renderer()

const App = () => {

    const [text, setText] = React.useState('')

    const startingText = `# Enter text here to see a markdown preview!
## This is an h2!
### This is an h3!

This is a [link](https://github.com/mabolen).
Inline code \`<div></div>\` is done with backticks.
Multi-line code uses three backticks 
\`\`\`
const func = () => {
    return console.log('multi-line code')
}
\`\`\`
You can also make...
**bold text**
> Block Quotes
- Lists
And images!
![images](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAACRCAMAAAD0BqoRAAAAaVBMVEX///9NTU1KSkpDQ0NWVlZHR0dAQEBZWVleXl5TU1M8PDw5OTkzMzPr6+v39/dQUFC9vb3l5eXV1dXx8fFvb29jY2N5eXmwsLCamppoaGilpaWGhobc3NyAgICOjo7Ozs4sLCwlJSUdHR1CHBPjAAAGX0lEQVR4nO1a2ZaiOhSFzAQIYQ6IYPX/f+Q9CeJM94tArbuyH0oKVLZnHggCDw8PDw8PDw8PDw8PDw8PDw+PbaDU0Qxe0LKuPJrDM0J0KY7m8IwKk/RoDkGQP+iJSH0ckQU6bu6UfsiBTBacJKuWY/3zC0QUDITF7fW4CfNDuSzQ1R/jDqb4dDCVBcoko7WlTvZHU7lB/1DTCxpPRxO5w2CMUZj8LRipsix3zDF5FAKSVcNW2lSIoapde8P3USFghKopTdPibG6yUEWRluVgQowpvIHKZjcxjTh0d6QISZwsYUk1SRzWNWbhAmb2YtTPN2V11YWxXNJtY88iFD7gsldxoGMno7ZUatCLyxUsfIPcy5Qmy4i+RMgTfWdEm50YDYm92/npXPqBEFj/TradWhkh8uT+4welhUhsW0GVC4XSme9T0B4+8AFGfNNsrOo/V0NVnVURe0xszSelbc6I4MWYXUB6NNs2PkJGQcXGhQB2RnK7UnyU0PZ21N9KonS+4XIhZ+gYRjq56ens1ObI6akUKyJ69cevY0rmInsyuYs+WA8t+UlYsiIh+5Zti6gpmZXAQFa9tEIKQV2RWZMQYOMGqpXIZtUpjsHvT/EsGdaPf2M0BcO0Xdwesf3JZcfcD9chhVoS04GsKw3xNOVy8VDztcpcDfMLRxQM6bz0aarQgEF/DkWOECsgmLOrP7RJ8i0dGlzlyr7Y8qKvXyqM7i92DQxSce3rcsHYl+xcdTFjjTk7WSSvFc+A1wlZ4aRkvH7Lz/g1x0vNqQpjZ7+QXRv2VIet2zXCVjhF7FRVEPLl0c5grG/hc3CWIZL3H5uvi2jOxMYNmVqMvx+9c/ApOrSuWBM3h67eRUS4cDpz4TRPwDMnEW8SvCeEajW7erIIqX8XEalrUQN5l/YnDh86060a4Ao3uXSM6M2h362nrnnNIypa1J1qm2AQDfFGbdIoR02F6x65s4oPEoJ0D4xEGIF+GV4CA+LbTCz7ZDSohu+fM6g6zSn2Fo8Qijj8qQUhFeh16uHS9SKSm0hJJ6cxBEachBj8qGMEjuBfHrnXjHNOBBySSovMllITizgHHTOMWdzp8uv9ZCGbU1YjTngWnaCQhQNC7L+EW0oCnCyzF+scOKJSBWkG16KkarVuqwto8dsNZc6gq67hLoigNgdZ8JAIJKKIAxEQURTyKMoirFM4g3pViEyIjFzdrKgk/nb7VlKRRcIy4uHUyyzidGYkQD4zI5JxwdJAo5CQBpiLrB6Wj6uRfrtaKkUEmrGMMpE76xH8xogLEoUZmFF2VmD0FAQoQo4aFZTb1dqqs9oJ4c6om5xIwGqQyDIBxhTxyMVr4oyluPAITicGrEltOCA5LykDNa+h6O7nkSNwhqZb8s1HlSO+MVpN+deeLq0ZHrdfmyyCiWhTrdVpckmpxR5rnHaef6AKNdEKodep0sbQ+HpXIdZExIZ/f80XMc3Gg81qbX2bDOyEYWbE+s+zGetoO+8A01k0sj2vMIr3XnCpKyP9aQpqhbfXIPSO2cPi6TMjutcc9AGziyXDR0Z0g3bjn5gtOs4/zq43nhV9hksjKEs/WPYxhOaFCOrKd++3S+6pBehp2NOa9Lx+mKfHjwKifVCeMLOgITnvF7gLywgbxZ9iNoq7IujRrT5B2O1wVb+DHlPb0mKtHkVEWaPznuInkj8F1CM/e4jKmjYuyochFm7adkTXomBZr6FYBVWySxlQMhTioJQ3QlHTMbsDpSxmUPXXIrKkcBGMcb2PhWuZjHbWTpdlIwXBUCY7Mw15mk7ajJ0de7X4PtL5fuf4hNwl02nsIhYDpPMtreyFMYqTGJp9ZgJ9CbGzIlXo6oJ2WY6WaT5Y5HkOyUO1VSavxi1HtzdBYjRjJSiI87R7vhtGKW+uJg0o1Zk3xZeunw5IdkNzD0UQi9ryvKwjUXvEs3fpKB+iE0bFxBd+O3cBM1SPH1pJRE/TabYmBOfxzkW3xVQ/7ouRMGPmCOKLGE+Y7v7kXXqWT6mDV8gqELHI2IxWErzxwu8Vef26UHdj0JguGVYz3O1aNMVvRRJisjYP0wcTvy0ttsTL+hpSCSameIrOasR7PlVq7vUQYrHsRn30s3/FxSVZjFEEaTb9Dc8ha4jVpDG6+A1krlC/7gltDw8PDw8PDw8PDw8PDw8PD4//Pf4Du7tTK9CyCqMAAAAASUVORK5CYII=)
`

    React.useEffect(() => {
        setText(startingText)
    }, [])

  return (
    <div className="text-center container">
        <h1>Markdown Previewer</h1>
        <h3>Enter text:</h3>
        <textarea className="textarea" id="editor" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <h3>Results:</h3>
        <div id="preview" dangerouslySetInnerHTML={{
            __html: marked(text, { renderer: renderer })
        }}></div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))