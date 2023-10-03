# Cron job configuration

```
> crontab -e
*/5 * * * * source /<HOME>/.bashrc && source /<VENV>/bin/activate && poetry run python /<PROJECT>/backend/manage.py runcrons > /PROJECT/cronjob.log
```
