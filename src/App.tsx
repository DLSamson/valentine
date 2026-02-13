import { Container } from "./components/layouts/Container";
import { PageLayout } from "./components/layouts/PageLayout";
import { HeartRain } from "./components/HeartRain";
import { Routes, BrowserRouter, Route } from "react-router"

const Page1 = () => (<p>hi!</p>);
const Page2 = () => (<p>hi!</p>);
const Page3 = () => (<p>hi!</p>);
const Page4 = () => (<p>hi!</p>);
const Page5 = () => (<p>hi!</p>);
const Page6 = () => (<p>hi!</p>);

export const App = () => (
    <BrowserRouter>
        <PageLayout>
            <Container>
                <Routes>
                    <Route path="/1" element={Page1} />
                    <Route path="/2" element={Page2} />
                    <Route path="/3" element={Page3} />
                    <Route path="/4" element={Page4} />
                    <Route path="/5" element={Page5} />
                    <Route path="/6" element={Page6} />
                </Routes>
            </Container>

            <HeartRain
                emojis={["💖", "💘", "💗", "💓", "💕", "❤️"]}
                rateMs={300}
                maxOnScreen={20}
                className="z-50"
            />
        </PageLayout>
    </BrowserRouter>
);
