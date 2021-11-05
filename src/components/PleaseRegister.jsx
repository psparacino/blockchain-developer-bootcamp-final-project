import './PleaseRegister.css'

const PleaseRegister = () => {
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
                <span>☝️</span>
                <span>P</span>
                <span>L</span>
                <span>E</span>
                <span>A</span>
                <span>S</span>
                <span>E</span>
                <span style={{paddingLeft: "50px"}}></span>
                <span>R</span>
                <span>E</span>
                <span>G</span>
                <span>I</span>
                <span>S</span>
                <span>T</span>             
                <span>E</span>
                <span>R</span>
            </div>
            <h3 class="fixed"></h3>
        </div>

    )

}

export default PleaseRegister;