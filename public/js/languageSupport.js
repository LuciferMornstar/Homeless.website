/**
 * Multi-language support for letter templates
 */

// Available languages
export const AVAILABLE_LANGUAGES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文',
};

// Templates for each language
const templates = {
  en: {
    housing: {
      title: "Housing Support Letter",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Dear {recipientName},

I am writing to support {clientName}'s application for housing assistance. {client_gender_pronoun_subject} is currently experiencing homelessness and would greatly benefit from your program.

{clientName} has been facing the following challenges:
{challenges}

Despite these challenges, {client_gender_pronoun_subject} has shown great resilience by:
{strengths}

I believe with proper housing support, {client_gender_pronoun_subject} will be able to:
{goals}

Thank you for your consideration. Please contact me at {senderPhone} or {senderEmail} if you need any additional information.

Sincerely,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    employment: {
      title: "Employment Support Letter",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Dear {recipientName},

I am writing to provide a reference for {clientName}, who is applying for employment with your organization. I have known {clientName} for a significant period and can attest to {client_gender_pronoun_possessive} character and work ethic.

Despite experiencing housing insecurity, {clientName} has demonstrated exceptional qualities:
{strengths}

{client_gender_pronoun_subject} has been working to overcome various obstacles, including:
{challenges}

With stable employment, {clientName} aims to:
{goals}

I believe {clientName} would be an excellent addition to your team. Please contact me at {senderPhone} or {senderEmail} if you require any further information.

Sincerely,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    services: {
      title: "Services Access Support Letter",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Dear {recipientName},

I am writing on behalf of {clientName} to support {client_gender_pronoun_possessive} application for access to your services. {client_gender_pronoun_subject} is currently experiencing hardship and would greatly benefit from the support your organization provides.

{clientName} is currently facing these challenges:
{challenges}

Throughout these difficulties, {client_gender_pronoun_subject} has demonstrated:
{strengths}

With access to your services, {clientName} hopes to achieve:
{goals}

I strongly believe that your program would make a significant positive impact on {clientName}'s situation. Please contact me at {senderPhone} or {senderEmail} if you need any additional information.

Sincerely,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    general: {
      title: "General Support Letter",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Dear {recipientName},

I am writing this letter in support of {clientName}. I have known {clientName} for some time and am familiar with {client_gender_pronoun_possessive} situation and character.

Currently, {clientName} is facing these challenges:
{challenges}

Despite these difficulties, {client_gender_pronoun_subject} has shown remarkable strengths including:
{strengths}

With appropriate support, {clientName} aims to:
{goals}

I am available to provide any additional information or clarification you may need. Please feel free to contact me at {senderPhone} or {senderEmail}.

Sincerely,
{senderName}
{senderTitle}
{senderOrganization}`
    }
  },
  es: {
    housing: {
      title: "Carta de Apoyo para Vivienda",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Estimado/a {recipientName},

Le escribo para apoyar la solicitud de {clientName} para asistencia de vivienda. {client_gender_pronoun_subject} actualmente se encuentra sin hogar y se beneficiaría enormemente de su programa.

{clientName} ha estado enfrentando los siguientes desafíos:
{challenges}

A pesar de estos desafíos, {client_gender_pronoun_subject} ha mostrado gran resiliencia mediante:
{strengths}

Creo que con el apoyo de vivienda adecuado, {client_gender_pronoun_subject} podrá:
{goals}

Gracias por su consideración. Por favor contácteme al {senderPhone} o {senderEmail} si necesita información adicional.

Atentamente,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    employment: {
      title: "Carta de Referencia Laboral",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Estimado/a {recipientName},

Le escribo para proporcionar una referencia para {clientName}, quien está solicitando empleo en su organización. He conocido a {clientName} por un período significativo y puedo dar fe de su carácter y ética de trabajo.

A pesar de experimentar inseguridad habitacional, {clientName} ha demostrado cualidades excepcionales:
{strengths}

{client_gender_pronoun_subject} ha estado trabajando para superar varios obstáculos, incluyendo:
{challenges}

Con un empleo estable, {clientName} aspira a:
{goals}

Creo que {clientName} sería una excelente adición a su equipo. Por favor contácteme al {senderPhone} o {senderEmail} si requiere más información.

Atentamente,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    services: {
      title: "Carta de Apoyo para Acceso a Servicios",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Estimado/a {recipientName},

Le escribo en nombre de {clientName} para apoyar su solicitud de acceso a sus servicios. {client_gender_pronoun_subject} actualmente está pasando por dificultades y se beneficiaría enormemente del apoyo que su organización proporciona.

{clientName} actualmente enfrenta estos desafíos:
{challenges}

A pesar de estas dificultades, {client_gender_pronoun_subject} ha demostrado:
{strengths}

Con acceso a sus servicios, {clientName} espera lograr:
{goals}

Creo firmemente que su programa tendría un impacto positivo significativo en la situación de {clientName}. Por favor contácteme al {senderPhone} o {senderEmail} si necesita información adicional.

Atentamente,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    general: {
      title: "Carta de Apoyo General",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Estimado/a {recipientName},

Escribo esta carta en apoyo a {clientName}. He conocido a {clientName} por algún tiempo y estoy familiarizado/a con su situación y carácter.

Actualmente, {clientName} está enfrentando estos desafíos:
{challenges}

A pesar de estas dificultades, {client_gender_pronoun_subject} ha mostrado fortalezas notables incluyendo:
{strengths}

Con el apoyo adecuado, {clientName} aspira a:
{goals}

Estoy disponible para proporcionar cualquier información adicional o aclaración que pueda necesitar. Por favor contácteme al {senderPhone} o {senderEmail}.

Atentamente,
{senderName}
{senderTitle}
{senderOrganization}`
    }
  },
  fr: {
    housing: {
      title: "Lettre de Soutien pour le Logement",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Cher/Chère {recipientName},

Je vous écris pour soutenir la demande d'aide au logement de {clientName}. {client_gender_pronoun_subject} est actuellement sans abri et bénéficierait grandement de votre programme.

{clientName} fait face aux défis suivants:
{challenges}

Malgré ces défis, {client_gender_pronoun_subject} a fait preuve d'une grande résilience en:
{strengths}

Je crois qu'avec un soutien au logement approprié, {client_gender_pronoun_subject} sera capable de:
{goals}

Merci pour votre considération. Veuillez me contacter au {senderPhone} ou à {senderEmail} si vous avez besoin d'informations supplémentaires.

Cordialement,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    employment: {
      title: "Lettre de Référence d'Emploi",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Cher/Chère {recipientName},

Je vous écris pour fournir une référence pour {clientName}, qui postule pour un emploi au sein de votre organisation. Je connais {clientName} depuis longtemps et je peux témoigner de son caractère et de son éthique de travail.

Malgré des difficultés liées au logement, {clientName} a démontré des qualités exceptionnelles:
{strengths}

{client_gender_pronoun_subject} a travaillé pour surmonter divers obstacles, notamment:
{challenges}

Avec un emploi stable, {clientName} vise à:
{goals}

Je crois que {clientName} serait un excellent ajout à votre équipe. Veuillez me contacter au {senderPhone} ou à {senderEmail} si vous avez besoin d'informations supplémentaires.

Cordialement,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    services: {
      title: "Lettre de Soutien pour l'Accès aux Services",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Cher/Chère {recipientName},

Je vous écris au nom de {clientName} pour soutenir sa demande d'accès à vos services. {client_gender_pronoun_subject} traverse actuellement des difficultés et bénéficierait grandement du soutien que votre organisation offre.

{clientName} fait actuellement face à ces défis:
{challenges}

Malgré ces difficultés, {client_gender_pronoun_subject} a démontré:
{strengths}

Avec l'accès à vos services, {clientName} espère atteindre:
{goals}

Je crois fermement que votre programme aurait un impact positif significatif sur la situation de {clientName}. Veuillez me contacter au {senderPhone} ou à {senderEmail} si vous avez besoin d'informations supplémentaires.

Cordialement,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    general: {
      title: "Lettre de Soutien Général",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Cher/Chère {recipientName},

Je vous écris cette lettre en soutien à {clientName}. Je connais {clientName} depuis un certain temps et je suis familier avec sa situation et son caractère.

Actuellement, {clientName} fait face à ces défis:
{challenges}

Malgré ces difficultés, {client_gender_pronoun_subject} a montré des forces remarquables, notamment:
{strengths}

Avec un soutien approprié, {clientName} vise à:
{goals}

Je suis disponible pour fournir toute information supplémentaire ou clarification dont vous pourriez avoir besoin. N'hésitez pas à me contacter au {senderPhone} ou à {senderEmail}.

Cordialement,
{senderName}
{senderTitle}
{senderOrganization}`
    }
  },
  de: {
    housing: {
      title: "Unterstützungsschreiben für Wohnraum",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Sehr geehrte(r) {recipientName},

ich schreibe, um {clientName}s Antrag auf Wohnhilfe zu unterstützen. {client_gender_pronoun_subject} ist derzeit obdachlos und würde sehr von Ihrem Programm profitieren.

{clientName} steht vor folgenden Herausforderungen:
{challenges}

Trotz dieser Herausforderungen hat {client_gender_pronoun_subject} große Widerstandsfähigkeit bewiesen durch:
{strengths}

Ich glaube, dass {client_gender_pronoun_subject} mit angemessener Wohnunterstützung in der Lage sein wird:
{goals}

Vielen Dank für Ihre Berücksichtigung. Bitte kontaktieren Sie mich unter {senderPhone} oder {senderEmail}, wenn Sie weitere Informationen benötigen.

Mit freundlichen Grüßen,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    employment: {
      title: "Referenzschreiben für Beschäftigung",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Sehr geehrte(r) {recipientName},

ich schreibe, um eine Referenz für {clientName} zu geben, der/die sich für eine Beschäftigung in Ihrer Organisation bewirbt. Ich kenne {clientName} seit längerer Zeit und kann seinen/ihren Charakter und Arbeitsethos bezeugen.

Trotz Wohnunsicherheit hat {clientName} außergewöhnliche Qualitäten bewiesen:
{strengths}

{client_gender_pronoun_subject} hat daran gearbeitet, verschiedene Hindernisse zu überwinden, darunter:
{challenges}

Mit einer stabilen Beschäftigung zielt {clientName} darauf ab:
{goals}

Ich glaube, dass {clientName} eine ausgezeichnete Ergänzung für Ihr Team wäre. Bitte kontaktieren Sie mich unter {senderPhone} oder {senderEmail}, wenn Sie weitere Informationen benötigen.

Mit freundlichen Grüßen,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    services: {
      title: "Unterstützungsschreiben für Zugang zu Dienstleistungen",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Sehr geehrte(r) {recipientName},

ich schreibe im Namen von {clientName}, um seinen/ihren Antrag auf Zugang zu Ihren Dienstleistungen zu unterstützen. {client_gender_pronoun_subject} befindet sich derzeit in Schwierigkeiten und würde sehr von der Unterstützung profitieren, die Ihre Organisation bietet.

{clientName} steht derzeit vor diesen Herausforderungen:
{challenges}

Trotz dieser Schwierigkeiten hat {client_gender_pronoun_subject} Folgendes bewiesen:
{strengths}

Mit Zugang zu Ihren Dienstleistungen hofft {clientName}, Folgendes zu erreichen:
{goals}

Ich glaube fest daran, dass Ihr Programm einen erheblichen positiven Einfluss auf {clientName}s Situation haben würde. Bitte kontaktieren Sie mich unter {senderPhone} oder {senderEmail}, wenn Sie weitere Informationen benötigen.

Mit freundlichen Grüßen,
{senderName}
{senderTitle}
{senderOrganization}`
    },
    general: {
      title: "Allgemeines Unterstützungsschreiben",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

Sehr geehrte(r) {recipientName},

ich schreibe diesen Brief zur Unterstützung von {clientName}. Ich kenne {clientName} seit einiger Zeit und bin mit seiner/ihrer Situation und seinem/ihrem Charakter vertraut.

Derzeit steht {clientName} vor diesen Herausforderungen:
{challenges}

Trotz dieser Schwierigkeiten hat {client_gender_pronoun_subject} bemerkenswerte Stärken gezeigt, darunter:
{strengths}

Mit angemessener Unterstützung zielt {clientName} darauf ab:
{goals}

Ich stehe zur Verfügung, um weitere Informationen oder Erläuterungen zu geben, die Sie benötigen könnten. Bitte kontaktieren Sie mich gerne unter {senderPhone} oder {senderEmail}.

Mit freundlichen Grüßen,
{senderName}
{senderTitle}
{senderOrganization}`
    }
  },
  zh: {
    housing: {
      title: "住房支持信",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

尊敬的 {recipientName}：

我写信是为了支持 {clientName} 的住房援助申请。{client_gender_pronoun_subject}目前无家可归，您的项目将对{client_gender_pronoun_object}有很大帮助。

{clientName} 正面临以下挑战：
{challenges}

尽管面临这些挑战，{client_gender_pronoun_subject}通过以下方式表现出了极大的韧性：
{strengths}

我相信有了适当的住房支持，{client_gender_pronoun_subject}将能够：
{goals}

感谢您的考虑。如需任何其他信息，请通过 {senderPhone} 或 {senderEmail} 联系我。

此致，
{senderName}
{senderTitle}
{senderOrganization}`
    },
    employment: {
      title: "就业推荐信",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

尊敬的 {recipientName}：

我写信是为 {clientName} 提供推荐，{client_gender_pronoun_subject}正在申请贵机构的工作。我认识 {clientName} 已有相当长的时间，可以证明{client_gender_pronoun_possessive}品格和工作道德。

尽管面临住房不稳定的情况，{clientName} 展示了非凡的品质：
{strengths}

{client_gender_pronoun_subject}一直在努力克服各种障碍，包括：
{challenges}

有了稳定的工作，{clientName} 的目标是：
{goals}

我相信 {clientName} 将成为您团队的优秀成员。如需任何进一步信息，请通过 {senderPhone} 或 {senderEmail} 联系我。

此致，
{senderName}
{senderTitle}
{senderOrganization}`
    },
    services: {
      title: "服务获取支持信",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

尊敬的 {recipientName}：

我代表 {clientName} 写信，支持{client_gender_pronoun_possessive}申请获取您的服务。{client_gender_pronoun_subject}目前正经历困难，贵机构提供的支持将对{client_gender_pronoun_object}有很大帮助。

{clientName} 目前面临这些挑战：
{challenges}

尽管面临这些困难，{client_gender_pronoun_subject}展示了：
{strengths}

通过获取您的服务，{clientName} 希望实现：
{goals}

我坚信您的项目将对 {clientName} 的情况产生重大积极影响。如需任何其他信息，请通过 {senderPhone} 或 {senderEmail} 联系我。

此致，
{senderName}
{senderTitle}
{senderOrganization}`
    },
    general: {
      title: "一般支持信",
      template: `{date}

{recipientName}
{recipientPosition}
{recipientOrganization}
{recipientAddress}
{recipientCity}, {recipientState} {recipientZip}

尊敬的 {recipientName}：

我写这封信是为了支持 {clientName}。我认识 {clientName} 已有一段时间，熟悉{client_gender_pronoun_possessive}情况和品格。

目前，{clientName} 面临这些挑战：
{challenges}

尽管面临这些困难，{client_gender_pronoun_subject}表现出了显著的优势，包括：
{strengths}

有了适当的支持，{clientName} 的目标是：
{goals}

我可以提供您可能需要的任何额外信息或澄清。请随时通过 {senderPhone} 或 {senderEmail} 联系我。

此致，
{senderName}
{senderTitle}
{senderOrganization}`
    }
  }
};

/**
 * Get all templates for a specific language
 * @param {String} languageCode - The language code (en, es, fr, de, zh)
 * @returns {Object} Templates for the requested language
 */
export function getTemplatesByLanguage(languageCode) {
  return templates[languageCode] || templates.en; // Default to English
}

/**
 * Get pronoun mapping for a language
 * @param {String} languageCode - The language code
 * @returns {Object} Pronoun mappings for the language
 */
export function getPronounMapping(languageCode) {
  const pronouns = {
    en: {
      male: { subject: "he", object: "him", possessive: "his" },
      female: { subject: "she", object: "her", possessive: "her" },
      neutral: { subject: "they", object: "them", possessive: "their" }
    },
    es: {
      male: { subject: "él", object: "lo", possessive: "su" },
      female: { subject: "ella", object: "la", possessive: "su" },
      neutral: { subject: "elle", object: "le", possessive: "su" }
    },
    fr: {
      male: { subject: "il", object: "le", possessive: "son" },
      female: { subject: "elle", object: "la", possessive: "sa" },
      neutral: { subject: "iel", object: "le/la", possessive: "son/sa" }
    },
    de: {
      male: { subject: "er", object: "ihn", possessive: "sein" },
      female: { subject: "sie", object: "sie", possessive: "ihr" },
      neutral: { subject: "sie", object: "sie", possessive: "ihr" }
    },
    zh: {
      male: { subject: "他", object: "他", possessive: "他的" },
      female: { subject: "她", object: "她", possessive: "她的" },
      neutral: { subject: "他们", object: "他们", possessive: "他们的" }
    }
  };
  
  return pronouns[languageCode] || pronouns.en;
}

/**
 * Get UI text translations
 * @param {String} languageCode - The language code
 * @returns {Object} UI text translations
 */
export function getUITranslations(languageCode) {
  const translations = {
    en: {
      generateBtn: "Generate Letter",
      saveBtn: "Save Letter",
      previewTitle: "Letter Preview",
      clientInfoTitle: "Client Information",
      recipientInfoTitle: "Recipient Information",
      senderInfoTitle: "Your Information",
      letterTypeLabel: "Letter Type",
      clientNameLabel: "Client Name",
      clientGenderLabel: "Client Gender (for pronouns)",
      challengesLabel: "Current Challenges",
      strengthsLabel: "Client Strengths",
      goalsLabel: "Client Goals"
    },
    es: {
      generateBtn: "Generar Carta",
      saveBtn: "Guardar Carta",
      previewTitle: "Vista Previa de la Carta",
      clientInfoTitle: "Información del Cliente",
      recipientInfoTitle: "Información del Destinatario",
      senderInfoTitle: "Su Información",
      letterTypeLabel: "Tipo de Carta",
      clientNameLabel: "Nombre del Cliente",
      clientGenderLabel: "Género del Cliente (para pronombres)",
      challengesLabel: "Desafíos Actuales",
      strengthsLabel: "Fortalezas del Cliente",
      goalsLabel: "Objetivos del Cliente"
    },
    fr: {
      generateBtn: "Générer la Lettre",
      saveBtn: "Enregistrer la Lettre",
      previewTitle: "Aperçu de la Lettre",
      clientInfoTitle: "Informations sur le Client",
      recipientInfoTitle: "Informations du Destinataire",
      senderInfoTitle: "Vos Informations",
      letterTypeLabel: "Type de Lettre",
      clientNameLabel: "Nom du Client",
      clientGenderLabel: "Genre du Client (pour les pronoms)",
      challengesLabel: "Défis Actuels",
      strengthsLabel: "Forces du Client",
      goalsLabel: "Objectifs du Client"
    },
    de: {
      generateBtn: "Brief Generieren",
      saveBtn: "Brief Speichern",
      previewTitle: "Briefvorschau",
      clientInfoTitle: "Kundeninformationen",
      recipientInfoTitle: "Empfängerinformationen",
      senderInfoTitle: "Ihre Informationen",
      letterTypeLabel: "Briefart",
      clientNameLabel: "Kundenname",
      clientGenderLabel: "Kundengeschlecht (für Pronomen)",
      challengesLabel: "Aktuelle Herausforderungen",
      strengthsLabel: "Kundenstärken",
      goalsLabel: "Kundenziele"
    },
    zh: {
      generateBtn: "生成信件",
      saveBtn: "保存信件",
      previewTitle: "信件预览",
      clientInfoTitle: "客户信息",
      recipientInfoTitle: "收件人信息",
      senderInfoTitle: "您的信息",
      letterTypeLabel: "信件类型",
      clientNameLabel: "客户姓名",
      clientGenderLabel: "客户性别（用于代词）",
      challengesLabel: "当前挑战",
      strengthsLabel: "客户优势",
      goalsLabel: "客户目标"
    }
  };

  return translations[languageCode] || translations.en;
}
