import { useEffect } from 'react'
import { Link } from './components/Link'
import { useTranslation } from 'react-i18next'

console.log('loading about file')

function About({ params }) {
  const { lng } = params
  const { t, i18n } = useTranslation()
  const ResourceLanguage = Object.keys(i18n.services.resourceStore.data)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    window.history.pushState({}, '', `/about/${lng}`)
  }

  useEffect(() => {
    i18n.changeLanguage(lng)
  }, [lng]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>{t('title')}</h1>
      <div>
        {ResourceLanguage.map((lng) => (
          <button key={lng} onClick={() => { changeLanguage(lng) }} disabled={i18n.resolvedLanguage === lng}>{lng}</button>
        ))}
      </div>
      <p>{t('body')}</p>
      <Link to='/'>{t('link')}</Link>
    </>
  )
}

export default About