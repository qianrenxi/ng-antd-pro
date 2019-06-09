import { Injectable } from '@nestjs/common';
import * as Mock from 'mockjs';

@Injectable()
export class UsersService {
    getData() {
        const data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|20': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                'name': '@cname',
                'sex|1': ['male', 'female'],
                'sign': '@cparagraph',
                'avatar': '@image(96x96)',
                'birthday': "@date('yyyy-MM-dd')",
                'salary|3000-5000': 1
            }]
        });

        // console.log(data);
        return data.list;
    }
}
