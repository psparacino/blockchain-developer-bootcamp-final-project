import './PleaseRegister.css'

const PleaseConnect = () => {
    const spans = document.querySelectorAll('.word span');

    spans.forEach((span, idx) => {
    span.addEventListener('click', (e) => {
        e.target.classList.add('active');
    });
    span.addEventListener('animationend', (e) => {
        e.target.classList.remove('active');
    });
    
    // Initial animation
    setTimeout(() => {
        span.classList.add('active');
    }, 750 * (idx+1))
    });

    return (
        <div className="registerBody">     
            <div class="word">
                <span>P</span>
                <span>L</span>
                <span>E</span>
                <span>A</span>
                <span>S</span>
                <span>E</span>
                <span style={{paddingLeft: "50px"}}></span>
                <span>C</span>
                <span>O</span>
                <span>N</span>
                <span>N</span>
                <span>E</span>
                <span>C</span>             
                <span>T</span>
                <span>☝️</span>
            </div>
            <h3 class="fixed"></h3>
        </div>

    )

}

export default PleaseConnect;