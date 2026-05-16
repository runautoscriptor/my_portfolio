import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LoaderScreen } from './components/LoaderScreen';
import { SiteLayout } from './components/SiteLayout';
import { HomePage } from './pages/HomePage';

const APP_BOOT_DELAY = 2200;

function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setIsBooting(false);
    }, APP_BOOT_DELAY);

    return () => {
      window.clearTimeout(bootTimer);
    };
  }, []);

  return (
    <SiteLayout>
      <AnimatePresence mode="wait">
        {isBooting ? (
          <LoaderScreen key="loader" />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <HomePage />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}

export default App;
