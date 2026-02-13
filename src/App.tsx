import { Container } from "./components/layouts/Container";
import { PageLayout } from "./components/layouts/PageLayout";
import { HeartRain } from "./components/HeartRain";
import { Routes, Route, HashRouter } from "react-router"
import { Card } from "./components/Card";
import { H1 } from "./components/H1";
import { Button } from "./components/Button";
import { useState } from "react";

// Главный QR
const Page1 = () => (<> 
    <Card>
        <H1>Я хочу сыграть с тобой в одну игру</H1>

        <img src="https://img.championat.com/s/1350x900/news/big/e/v/u-pily-10-est-tolko-odin-shans-na-uspeh_166089842980078313.jpg" />
    </Card>

    <Card>
        <H1>Описание</H1>
        
        <p className="text-xl">Смысл простой, найди все QR-коды, которые я спрятал</p>

        <p className="text-xl">В самом конце тебя будет ждать сюрприз</p>

        <p className="text-xl">Я предусмотрел то, что ты можешь найти какой-то QR раньше положенного, поэтому тебе нужно будет вводить специальный код, который будет на каждом QR-коде</p>
    </Card>

    <Card>
        <H1>Первая подсказка:</H1>

        <p className="text-xl">
            Я стою на страже порядка,<br />
            Внутри меня всегда прохлада.<br />
            Откроешь — найдёшь еду,<br />
            А может, и подсказку!
        </p>
    </Card>
</>);

// В холодильнике
const Page2 = () => {
    const [pass, setPass] = useState('');

    if (pass !== '325') {
        return (
            <Card>
                <H1>Введи пароль</H1>
                <input className="border p-4 border-gray-400 rounded-xl shadow" onChange={e => setPass(e.target.value)}></input>
            </Card>
        )
    }

    return (
        <Card>
            <H1>Вторая подсказка:</H1>

            <p className="text-xl">
                Я — источник света в ночи,<br />
                Меня включаешь, когда темно.<br />
                Подо мной ищи, не зевай,<br />
                Следующий шаг — угадай!
            </p>
        </Card>
    )
};

// Огонёк
const Page3 = () => {
    const [pass, setPass] = useState('');

    if (pass !== '478') {
        return (
            <Card>
                <H1>Введи пароль</H1>
                <input className="border p-4 border-gray-400 rounded-xl shadow" onChange={e => setPass(e.target.value)}></input>
            </Card>
        )
    }

    return (
        <Card>
            <H1>Третья подсказка:</H1>

            <p className="text-xl">
                Я — место, где книги живут,<br />
                Знания в себе берегу.<br />
                На полке меня ищи,<br />
                Финал уже близко, лови!
            </p>
        </Card>
    )
};

// Книжная полка
const Page4 = () => {
    const [pass, setPass] = useState('');

    if (pass !== '532') {
        return (
            <Card>
                <H1>Введи пароль</H1>
                <input className="border p-4 border-gray-400 rounded-xl shadow" onChange={e => setPass(e.target.value)}></input>
            </Card>
        )
    }

    return (
        <Card>
            <H1>Четвёртая подсказка:</H1>

            <p className="text-xl">
                На мне ты любишь побегать,<br />
                Но скучает моя душа,<br />
                Ведь обычною вешалкой<br />
                Стала я
            </p>
        </Card>
    )
};

// Под беговой дорожкой
const Page5 = () => {
    const [pass, setPass] = useState('');

    if (pass !== '847') {
        return (
            <Card>
                <H1>Введи пароль</H1>
                <input className="border p-4 border-gray-400 rounded-xl shadow" onChange={e => setPass(e.target.value)}></input>
            </Card>
        )
    }

    return (
        <Card>
            <H1>Вторая подсказка:</H1>

            <p className="text-xl">
                Я яркий и красивый,<br />
                С рисунком дракона,<br />
                Без моей опоры <br />
                Мышкой двигать не удобно
            </p>
        </Card>
    )
};

const Page6 = () => {
    const [answer, setAnswer] = useState(localStorage.getItem('answer') ?? '');
    const [pass, setPass] = useState('');

    const onClick = (answer: string) => {
        localStorage.setItem('answer', answer);
        setAnswer(answer);
    }

    if (pass !== '932') {
        return (
            <Card>
                <H1>Введи пароль</H1>
                <input className="border p-4 border-gray-400 rounded-xl shadow" onChange={e => setPass(e.target.value)}></input>
            </Card>
        )
    }

    if (answer === 'no') {
        return (
            <Card>
                <H1>💀</H1>
            </Card>
        )
    }

    if (answer === 'yes') {
        return (
            <Card>
                <H1>❤</H1>

                <p className="text-center text-2xl">Последняя точка - под ванной</p>
            </Card>
        )
    }

    return (
        <Card>
            <H1>Ты будешь моей валентинкой?</H1>

            <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => onClick('yes')}>Да</Button>
                <Button onClick={() => onClick('no')}>Нет</Button>
            </div>
        </Card>
    )
};

export const App = () => (
    <HashRouter>
        <PageLayout>
            <Container>
                <Routes>
                    <Route path="/1" element={<Page1 />} />
                    <Route path="/2" element={<Page2 />} />
                    <Route path="/3" element={<Page3 />} />
                    <Route path="/4" element={<Page4 />} />
                    <Route path="/5" element={<Page5 />} />
                    <Route path="/6" element={<Page6 />} />
                </Routes>
            </Container>

            <HeartRain
                emojis={["💖", "💘", "💗", "💓", "💕", "❤️"]}
                rateMs={300}
                maxOnScreen={20}
                className="z-50"
            />
        </PageLayout>
    </HashRouter>
);
