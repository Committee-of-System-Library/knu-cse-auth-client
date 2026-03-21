import { useLanguage } from '@/contexts/LanguageContext'
import { loginTranslations } from '../translations'

export default function LoginIntroSection() {
    const { language } = useLanguage()
    const t = loginTranslations[language]

    return (
        <div className="hidden lg:flex flex-col justify-center max-w-lg animate-fade-up">
            <div className="flex items-center gap-5 mb-8">
                <img
                    src={`${import.meta.env.BASE_URL}cse_logo.svg`}
                    alt="CSE Logo"
                    className="w-14 h-14 drop-shadow-lg"
                />
                <div>
                    <h1 className="text-white text-2xl font-bold tracking-tight leading-tight">
                        {t.universityName}
                    </h1>
                    <h1 className="text-white text-2xl font-bold tracking-tight leading-tight">
                        {t.cseName}
                    </h1>
                </div>
            </div>

            <p className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-4">
                {t.cseSub}
            </p>

            <h2 className="text-white/90 text-lg font-medium leading-relaxed mb-10">
                {t.welcome}
            </h2>

            <div className="flex gap-3">
                <a
                    href="https://cse.knu.ac.kr/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/80 border border-white/20 hover:bg-white/10 hover:text-white transition-all"
                >
                    {t.linkDept}
                </a>
                <a
                    href="https://www.knu.ac.kr/wbbs/wbbs/main/main.action"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/80 border border-white/20 hover:bg-white/10 hover:text-white transition-all"
                >
                    {t.linkUniv}
                </a>
            </div>

            <div className="mt-16 text-white/40 text-xs space-y-1">
                <p>{t.footerDept}</p>
                <p>{t.footerAddress}</p>
                <p>{t.footerCopyright}</p>
            </div>
        </div>
    )
}
