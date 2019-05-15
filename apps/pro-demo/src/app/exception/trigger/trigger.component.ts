import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'demo-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss']
})
export class TriggerComponent implements OnInit {

  exceptionMap = {
    401: {
      title: '请求错误 401: /api/401',
      message: '用户没有权限（令牌、用户名、密码错误）。'
    },
    403: {
      title: '请求错误 403: /api/403',
      message: '用户得到授权，但是访问是被禁止的。'
    },
    404: {
      title: '请求错误 404: /api/404',
      message: '发出的请求针对的是不存在的记录，服务器没有进行操作'
    },
    500: {
      title: '请求错误 500: /api/500',
      message: '服务器发生错误，请检查服务器'
    }
  };

  constructor(
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
  }

  triggerError(code) {
    const ex = this.exceptionMap[code];
    this.notification.error(ex.title, ex.message);

    // TODO: 跳转到相关的异常页
  }
}
