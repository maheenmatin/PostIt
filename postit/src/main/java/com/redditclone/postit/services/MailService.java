package com.redditclone.postit.services;

import com.redditclone.postit.configuration.AppMailConfig;
import com.redditclone.postit.exceptions.PostItException.PostItException;
import com.redditclone.postit.models.NotificationEmail;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
class MailService {
    private final JavaMailSender mailSender;
    private final MailContentBuilder mailContentBuilder;
    private final AppMailConfig mailConfig;

    // email is sent after database is queried+updated - this is expensive/time-consuming
    // call method asynchronously (new thread) to decrease response time
    @Async
    public void sendMail(NotificationEmail notificationEmail) {
        if (!mailConfig.isEnabled()) {
            log.info("Mail delivery disabled; skipping email to {}", notificationEmail.getRecipient());
            return;
        }
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("postit@email.com");
            messageHelper.setTo(notificationEmail.getRecipient());
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(mailContentBuilder.build(notificationEmail.getBody()), true);
        };
        try {
            mailSender.send(messagePreparator);
            log.info("Activation email sent");
        } catch (MailException e) {
            log.error("Exception occurred when sending mail", e);
            throw new PostItException("Exception occurred when sending mail to " + notificationEmail.getRecipient(), e);
        }
    }
}
