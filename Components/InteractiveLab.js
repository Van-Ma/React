import InteractiveInfo from '../utils/InteractiveInfo';

function InteractiveLab() {
    const openTab = (route) => {
        window.open(route, '_blank');
    };

    return (
        <div className="lab-page">
            <div className="lab-container">
                {InteractiveInfo.map((component, index) => (
                    <div className="lab-item" key={index}>
                        <div className="lab-demo" onClick={() => openTab(component.route)}>
                            <figure>
                                <video
                                    className="lab-video"
                                    src={component.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            </figure>
                        </div>
                        <p>{component.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InteractiveLab;
